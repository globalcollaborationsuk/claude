// MP4 Export utility for animation Stage
// Captures frames and encodes them to MP4 using FFmpeg.wasm

const MP4Export = (() => {
  let ffmpegInstance = null;

  const initFFmpeg = async () => {
    if (ffmpegInstance) return ffmpegInstance;

    const { FFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = new FFmpeg.FFmpeg();

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  };

  const exportCanvasToMP4 = async (options) => {
    const {
      canvas,
      width = 1080,
      height = 1920,
      duration = 20,
      fps = 30,
      onProgress = () => {},
    } = options;

    if (!canvas) {
      throw new Error('Canvas element required');
    }

    const ffmpeg = await initFFmpeg();
    const frameCount = Math.ceil(duration * fps);
    const frames = [];

    // Capture frames from canvas
    onProgress({ status: 'Capturing frames', progress: 0, frameCount });

    for (let i = 0; i < frameCount; i++) {
      await new Promise((resolve) => {
        // Give the browser time to render
        requestAnimationFrame(() => {
          canvas.toBlob((blob) => {
            frames.push(blob);
            onProgress({
              status: 'Capturing frames',
              progress: ((i + 1) / frameCount) * 0.5,
              frameCount,
              currentFrame: i + 1,
            });
            resolve();
          }, 'image/png');
        });
      });
    }

    // Write frames to FFmpeg
    onProgress({ status: 'Writing frames to encoder', progress: 0.5 });
    for (let i = 0; i < frames.length; i++) {
      const data = await frames[i].arrayBuffer();
      ffmpeg.FS('writeFile', `frame${String(i).padStart(6, '0')}.png`, new Uint8Array(data));
    }

    // Encode to MP4
    onProgress({ status: 'Encoding MP4', progress: 0.7 });
    await ffmpeg.run(
      '-framerate', String(fps),
      '-i', 'frame%06d.png',
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-crf', '23',
      'output.mp4'
    );

    // Read output
    onProgress({ status: 'Finalizing', progress: 0.95 });
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const blob = new Blob([data.buffer], { type: 'video/mp4' });

    // Clean up
    ffmpeg.FS('unlink', 'output.mp4');
    for (let i = 0; i < frames.length; i++) {
      ffmpeg.FS('unlink', `frame${String(i).padStart(6, '0')}.png`);
    }

    onProgress({ status: 'Complete', progress: 1.0 });
    return blob;
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    initFFmpeg,
    exportCanvasToMP4,
    downloadBlob,
  };
})();

Object.assign(window, { MP4Export });
