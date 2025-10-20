<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     * Accepts a comma-separated list of role slugs and allows access if the user has any.
     */
    public function handle(Request $request, Closure $next, string $rolesCsv): Response
    {
        $user = Auth::user();
        if (!$user) {
            abort(403);
        }

        $requiredRoles = collect(explode(',', $rolesCsv))
            ->map(fn ($r) => trim(strtolower($r)))
            ->filter()
            ->values();

        if ($requiredRoles->isEmpty()) {
            return $next($request);
        }

        $userRoleSlugs = DB::table('role_user')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->where('role_user.user_id', $user->id)
            ->pluck('roles.slug')
            ->map(fn ($r) => strtolower($r));

        if ($userRoleSlugs->intersect($requiredRoles)->isNotEmpty()) {
            return $next($request);
        }

        abort(403);
    }
}


