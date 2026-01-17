#!/bin/bash

# Ghana Regional Map Image Setup Script
# This script helps you save the map image to the correct location

echo "🗺️  Ghana Regional Map - Image Setup"
echo "======================================"
echo ""

TARGET_DIR="/Users/liam/Desktop/fidget/adesua/public"
TARGET_FILE="$TARGET_DIR/ghana-regional-map.png"

echo "📁 Target location: $TARGET_FILE"
echo ""

# Check if file already exists
if [ -f "$TARGET_FILE" ]; then
    echo "✅ Map image already exists!"
    echo ""
    echo "File size: $(du -h "$TARGET_FILE" | cut -f1)"
    echo ""
    echo "To replace it, delete the existing file first:"
    echo "  rm $TARGET_FILE"
    echo ""
    exit 0
fi

echo "📋 Instructions to save the map image:"
echo ""
echo "METHOD 1 - From Chat (Recommended):"
echo "  1. Right-click the Ghana map image in your chat"
echo "  2. Select 'Save Image As...'"
echo "  3. Navigate to: $TARGET_DIR"
echo "  4. Save as: ghana-regional-map.png"
echo ""
echo "METHOD 2 - Drag and Drop:"
echo "  1. Open Finder to: $TARGET_DIR"
echo "  2. Drag the map image from chat to the Finder window"
echo "  3. Rename to: ghana-regional-map.png"
echo ""
echo "METHOD 3 - Command Line:"
echo "  1. Download/save the image anywhere on your computer"
echo "  2. Run this command (replace PATH_TO_YOUR_IMAGE):"
echo "     cp PATH_TO_YOUR_IMAGE $TARGET_FILE"
echo ""
echo "After saving the image, run this script again to verify!"
echo ""
echo "Then test your map:"
echo "  1. php artisan serve"
echo "  2. Open: http://localhost:8000"
echo "  3. Login as admin@adesua.gov.gh / password"
echo "  4. Go to: Admin → Analytics"
echo ""

