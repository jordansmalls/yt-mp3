#!/usr/bin/env node
/**
 * ytMP3 - YouTube to MP3 Downloader (Node.js version)
 * A simple CLI tool to download YouTube playlists as MP3 files
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function getDefaultOutputDir() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}-ytmp3`;
}

async function checkDependency(cmd) {
  try {
    if (cmd === 'ffmpeg') {
      execSync(cmd, { stdio: 'pipe', timeout: 5000 });
    } else {
      execSync(`${cmd} --version`, { stdio: 'pipe' });
    }
    return true;
  } catch (error) {
    // Even if it fails with "Unrecognized option", if we got output, it's working
    if (error.stderr && error.stderr.toString().includes('ffmpeg version')) {
      return true;
    }
    return false;
  }
}

function downloadAsMp3(url, outputPath) {
  return new Promise((resolve, reject) => {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const ytdlpCmd = `yt-dlp --extract-audio --audio-format mp3 --audio-quality 192k -o "${path.join(outputPath, '%(title)s.%(ext)s')}" "${url}"`;

    console.log(`\nStarting download...\nCommand: ${ytdlpCmd}\n`);

    try {
      const child = execSync(ytdlpCmd, {
        stdio: 'pipe',
        encoding: 'utf8',
      });

      console.log(child.stdout);
      if (child.stderr) {
        console.error('Stderr:', child.stderr);
      }

      console.log(`\nDownload completed! Files saved to: ${outputPath}`);
      resolve();
    } catch (error) {
      reject(new Error(`Download failed: ${error.message}`));
    }
  });
}

async function main() {
  console.log('=== ytMP3 - YouTube to MP3 Downloader (Node.js version) ===\n');

  try {
    // Check dependencies
    const ffmpegAvailable = await checkDependency('ffmpeg');
    const ytdlpAvailable = await checkDependency('yt-dlp');

    if (!ffmpegAvailable) {
      console.error('Error: FFmpeg is not installed or not in PATH');
      console.log('Please install FFmpeg: https://ffmpeg.org/download.html');
      return 1;
    }

    if (!ytdlpAvailable) {
      console.error('Error: yt-dlp is not installed or not in PATH');
      console.log(
        'Please install yt-dlp: https://github.com/yt-dlp/yt-dlp#installation'
      );
      return 1;
    }

    // Get YouTube URL
    let url = '';
    while (!url.trim()) {
      url = await question('Enter the YouTube video or playlist URL: ');
      if (!url.trim()) {
        console.log('Error: URL cannot be empty\n');
      }
    }
    url = url.trim();

    // Get custom output directory
    const defaultDir = getDefaultOutputDir();
    let customDir = await question(
      `Enter download location (default: ${defaultDir}): `
    );
    customDir = customDir.trim();

    const outputPath = customDir || defaultDir;

    // Confirm before starting
    await question('\nPress Enter to start downloading...');

    // Start download
    await downloadAsMp3(url, outputPath);

    console.log('\n✓ Download finished successfully!');
    return 0;
  } catch (error) {
    console.error(`\n✗ Download failed: ${error.message}`);
    return 1;
  } finally {
    rl.close();
  }
}

main().then(process.exit);
