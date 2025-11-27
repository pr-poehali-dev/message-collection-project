import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface PlateGameProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PlateGame({ open, onOpenChange }: PlateGameProps) {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [platePosition, setPlatePosition] = useState({ x: 50, y: 80 });
  const [fallingItems, setFallingItems] = useState<{ id: number; x: number; y: number; speed: number; emoji: string }[]>([]);
  const gameLoopRef = useRef<number>();
  const itemIdRef = useRef(0);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setFallingItems([]);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const spawnInterval = setInterval(() => {
      const newItem = {
        id: itemIdRef.current++,
        x: Math.random() * 90,
        y: -5,
        speed: 1 + Math.random() * 2,
        emoji: Math.random() > 0.3 ? '🍽️' : '💣'
      };
      setFallingItems(prev => [...prev, newItem]);
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      setFallingItems(prev => {
        const updated = prev.map(item => ({
          ...item,
          y: item.y + item.speed
        }));

        updated.forEach(item => {
          if (
            item.y >= platePosition.y - 5 &&
            item.y <= platePosition.y + 5 &&
            Math.abs(item.x - platePosition.x) < 8
          ) {
            if (item.emoji === '🍽️') {
              setScore(s => s + 10);
              toast.success('+10 очков!');
            } else {
              setGameOver(true);
              setIsPlaying(false);
              toast.error('Игра окончена! Вы поймали бомбу 💣');
            }
          }
        });

        return updated.filter(item => item.y < 100);
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, platePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPlatePosition(prev => ({ ...prev, x: Math.max(5, Math.min(95, x)) }));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setPlatePosition(prev => ({ ...prev, x: Math.max(5, Math.min(95, x)) }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Icon name="Gamepad2" size={28} />
            Поймай тарелку! 🍽️
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-xl">
            <div className="text-lg font-bold">Счёт: {score}</div>
            <div className="text-sm">Ловите тарелки 🍽️, избегайте бомбы 💣!</div>
          </div>

          {!isPlaying && !gameOver && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold mb-2">Готовы играть?</h3>
              <p className="text-muted-foreground mb-6">
                Перемещайте корзину мышкой или пальцем, чтобы ловить тарелки!
              </p>
              <Button size="lg" onClick={startGame} className="rounded-xl">
                <Icon name="Play" size={20} className="mr-2" />
                Начать игру
              </Button>
            </div>
          )}

          {gameOver && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💥</div>
              <h3 className="text-xl font-bold mb-2">Игра окончена!</h3>
              <p className="text-2xl font-black text-primary mb-6">Ваш счёт: {score}</p>
              <Button size="lg" onClick={startGame} className="rounded-xl">
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Играть снова
              </Button>
            </div>
          )}

          {isPlaying && (
            <div
              className="relative w-full h-96 bg-gradient-to-b from-sky-200 to-sky-50 rounded-2xl border-4 border-primary overflow-hidden cursor-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {fallingItems.map(item => (
                <div
                  key={item.id}
                  className="absolute text-4xl transition-none"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {item.emoji}
                </div>
              ))}

              <div
                className="absolute text-5xl transition-all duration-100"
                style={{
                  left: `${platePosition.x}%`,
                  top: `${platePosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                🧺
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
