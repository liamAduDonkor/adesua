<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Vendor;
use App\Models\TeacherPerformance;
use App\Models\StudentPerformance;
use App\Models\VendorStatistics;
use App\Models\School;

class PerformanceDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing data
        $teachers = Teacher::with('school')->get();
        $students = Student::with('school')->get();
        $vendors = Vendor::all();
        $schools = School::all();

        if ($teachers->isEmpty() || $students->isEmpty() || $vendors->isEmpty()) {
            $this->command->info('No teachers, students, or vendors found. Please run the main seeder first.');
            return;
        }

        // Create teacher performance data
        foreach ($teachers as $teacher) {
            $academicYears = ['2021/2022', '2022/2023', '2023/2024'];
            $terms = ['Term 1', 'Term 2', 'Term 3'];
            $subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Physical Education'];

            foreach ($academicYears as $year) {
                foreach ($terms as $term) {
                    foreach ($subjects as $subject) {
                        if (rand(1, 3) === 1) { // 33% chance to create record
                            TeacherPerformance::create([
                                'teacher_id' => $teacher->id,
                                'school_id' => $teacher->school_id,
                                'academic_year' => $year,
                                'term' => $term,
                                'subject' => $subject,
                                'classes_taught' => rand(15, 30),
                                'students_taught' => rand(20, 50),
                                'average_student_score' => rand(60, 95) + (rand(0, 99) / 100),
                                'attendance_rate' => rand(85, 100),
                                'punctuality_rate' => rand(80, 100),
                                'performance_notes' => 'Good performance in ' . $subject,
                                'assessment_scores' => [
                                    'quiz_1' => rand(70, 95),
                                    'quiz_2' => rand(70, 95),
                                    'midterm' => rand(70, 95),
                                    'final' => rand(70, 95),
                                ],
                                'performance_rating' => $this->getPerformanceRating(rand(60, 95)),
                            ]);
                        }
                    }
                }
            }
        }

        // Create student performance data
        foreach ($students as $student) {
            $academicYears = ['2021/2022', '2022/2023', '2023/2024'];
            $terms = ['Term 1', 'Term 2', 'Term 3'];

            foreach ($academicYears as $year) {
                foreach ($terms as $term) {
                    if (rand(1, 2) === 1) { // 50% chance to create record
                        $subjectScores = [
                            'Mathematics' => rand(60, 95),
                            'English' => rand(60, 95),
                            'Science' => rand(60, 95),
                            'Social Studies' => rand(60, 95),
                            'Physical Education' => rand(70, 95),
                        ];

                        $overallAverage = array_sum($subjectScores) / count($subjectScores);

                        StudentPerformance::create([
                            'student_id' => $student->id,
                            'school_id' => $student->school_id,
                            'academic_year' => $year,
                            'term' => $term,
                            'class' => $student->class,
                            'subject_scores' => $subjectScores,
                            'overall_average' => $overallAverage,
                            'attendance_rate' => rand(80, 100),
                            'punctuality_rate' => rand(85, 100),
                            'behavior_rating' => $this->getBehaviorRating(),
                            'performance_notes' => 'Student showing good progress',
                            'extracurricular_activities' => [
                                'sports' => rand(0, 1) ? 'Football' : null,
                                'clubs' => rand(0, 1) ? 'Debate Club' : null,
                                'volunteer' => rand(0, 1) ? 'Community Service' : null,
                            ],
                            'performance_rating' => $this->getPerformanceRating($overallAverage),
                        ]);
                    }
                }
            }
        }

        // Create vendor statistics data
        foreach ($vendors as $vendor) {
            $academicYears = ['2021/2022', '2022/2023', '2023/2024'];
            $serviceCategories = ['Supplies', 'Maintenance', 'Transportation', 'Technology', 'Food Services'];

            foreach ($academicYears as $year) {
                foreach ($serviceCategories as $category) {
                    if (rand(1, 4) === 1) { // 25% chance to create record
                        $contractValue = rand(5000, 50000);
                        $amountPaid = $contractValue * (rand(80, 100) / 100);

                        VendorStatistics::create([
                            'vendor_id' => $vendor->id,
                            'academic_year' => $year,
                            'service_category' => $category,
                            'contracts_awarded' => rand(1, 5),
                            'total_contract_value' => $contractValue,
                            'amount_paid' => $amountPaid,
                            'delivery_performance' => rand(75, 100),
                            'quality_rating' => rand(3, 5) + (rand(0, 9) / 10),
                            'timeliness_rating' => rand(3, 5) + (rand(0, 9) / 10),
                            'performance_notes' => 'Good service delivery',
                            'contract_details' => [
                                'contract_number' => 'CNT-' . rand(1000, 9999),
                                'start_date' => '2023-09-01',
                                'end_date' => '2024-08-31',
                                'status' => 'Active',
                            ],
                            'compliance_status' => rand(1, 10) > 2 ? 'compliant' : 'non_compliant',
                        ]);
                    }
                }
            }
        }

        $this->command->info('Performance data seeded successfully!');
    }

    private function getPerformanceRating($score)
    {
        if ($score >= 85) return 'excellent';
        if ($score >= 70) return 'good';
        if ($score >= 55) return 'satisfactory';
        return 'needs_improvement';
    }

    private function getBehaviorRating()
    {
        $ratings = ['excellent', 'good', 'satisfactory', 'needs_improvement'];
        return $ratings[array_rand($ratings)];
    }
}