import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
}

export function LightModeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize stars
    const initStars = (count: number = 800) => {
      starsRef.current = [];
      for (let i = 0; i < count; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          px: 0,
          py: 0,
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with fade effect for trails - light mode version
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const speed = 0.5;

      starsRef.current.forEach((star) => {
        // Move star
        star.z -= speed;

        // Reset star if it goes behind the camera
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = canvas.width;
          star.px = 0;
          star.py = 0;
        }

        // Project 3D position to 2D
        const k = 128 / star.z;
        const x = star.x * k + centerX;
        const y = star.y * k + centerY;

        // Calculate star size based on depth
        const size = (1 - star.z / canvas.width) * 2;
        const opacity = (1 - star.z / canvas.width) * 0.6;

        // Draw star trail
        if (star.px !== 0) {
          ctx.beginPath();
          ctx.moveTo(star.px, star.py);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * 0.5})`;
          ctx.lineWidth = size;
          ctx.stroke();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        
        // Color based on depth for variety - light mode colors
        const colorVariation = Math.random();
        if (colorVariation > 0.9) {
          // Cyan accent stars
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        } else if (colorVariation > 0.8) {
          // Indigo accent stars
          ctx.fillStyle = `rgba(79, 70, 229, ${opacity})`;
        } else if (colorVariation > 0.7) {
          // Purple accent stars
          ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
        } else {
          // Slate gray stars (main color for light mode)
          ctx.fillStyle = `rgba(71, 85, 105, ${opacity * 0.8})`;
        }
        
        ctx.fill();

        // Add glow effect for brighter stars
        if (opacity > 0.45) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Store previous position for trail
        star.px = x;
        star.py = y;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}