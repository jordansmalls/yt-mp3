<img src="https://i.ibb.co/SXzMJF3s/ytmp3.jpg" alt="">

<p style="text-align: center;"><span style="font-weight: bold;">yt-mp3 </span>is a simple and fast, CLI tool to download batch youtube videos as mp3 files, built on top of yt-dlp and ffmpeg.</p>

## Versions

### 1. Python Version (`ytmp3.py`)
- Uses yt-dlp Python library directly
- Good for Python environments

### 2. Node.js Version (`ytmp3.js`)
- Uses yt-dlp via command line interface
- Good for Node.js/JavaScript environments
- Can be installed globally via npm/pnpm


## Features (All Versions)
- Download YouTube videos or playlists as MP3
- Customizable download location (defaults to date-based folder)
- Simple, functional interface
- Waits for user confirmation before starting

## Requirements
- Python 3.x (for Python version) OR Node.js >=14.0.0 (for Node.js versions)
- yt-dlp (command line tool)
- FFmpeg (for audio conversion)

## Installation

### Python Version
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Make sure FFmpeg and yt-dlp are installed and available in your PATH
3. Run:
   ```bash
   python ytmp3.py
   ```

### Node.js Version (Basic)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Make sure FFmpeg and yt-dlp are installed and available in your PATH
3. Run:
   ```bash
   npm start
   ```
   Or directly:
   ```bash
   node ytmp3.js
   ```

## Usage (All Versions)
Follow the prompts:
1. Enter YouTube video or playlist URL
2. Specify download location (or press Enter for default like "2026-05-27-ytmp3")
3. Press Enter/Start to begin downloading

The tool will download the audio and convert it to MP3 format using yt-dlp and FFmpeg.

## Global Installation (Node.js versions only)
```bash
npm install -g .
ytmp3              # Basic version
```
