#!/usr/bin/env python3
"""
ytmp3 - A simple CLI tool to download YouTube playlists as MP3 files
"""

import os
import sys
import subprocess
from datetime import datetime
import yt_dlp


def get_default_output_dir():
    """Generate default output directory name based on current date"""
    return datetime.now().strftime("%Y-%m-%d-ytmp3")


def download_as_mp3(url, output_path):
    """Download YouTube video/playlist as MP3 using yt-dlp"""
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': os.path.join(output_path, '%(title)s.%(ext)s'),
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        print(f"\nDownload completed! Files saved to: {output_path}")
    except Exception as e:
        print(f"Error downloading: {e}")
        return False

    return True


def main():
    print("=== ytMP3 - YouTube to MP3 Downloader ===\n")

    # Get YouTube URL
    url = input("Enter the YouTube video or playlist URL: ").strip()
    if not url:
        print("Error: URL cannot be empty")
        return 1

    # Get custom output directory
    default_dir = get_default_output_dir()
    custom_dir = input(f"Enter download location (default: {default_dir}): ").strip()

    if not custom_dir:
        output_path = default_dir
    else:
        output_path = custom_dir

    # Create output directory if it doesn't exist
    if not os.path.exists(output_path):
        try:
            os.makedirs(output_path)
            print(f"Created directory: {output_path}")
        except Exception as e:
            print(f"Error creating directory: {e}")
            return 1

    # Confirm before starting
    input("\nPress Enter to start downloading...")

    # Start download
    print("\nStarting download...")
    success = download_as_mp3(url, output_path)

    if success:
        print("\n✓ Download finished successfully!")
    else:
        print("\n✗ Download failed!")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())