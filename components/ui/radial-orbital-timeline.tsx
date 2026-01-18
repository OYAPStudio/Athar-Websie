"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Lightbulb, Code, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Planning",
    date: "Phase 1",
    content: "We start by understanding your vision, goals, and requirements. Our team conducts thorough research and creates a detailed project roadmap.",
    category: "Planning",
    icon: Lightbulb,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Development",
    date: "Phase 2",
    content: "Our expert team brings your vision to life using cutting-edge technologies and best practices. Regular updates keep you informed throughout.",
    category: "Development",
    icon: Code,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 3,
    title: "Production",
    date: "Phase 3",
    content: "We ensure a smooth deployment and provide ongoing support. Your success is our success, and we're here for the long term.",
    category: "Release",
    icon: Rocket,
    relatedIds: [2],
    status: "pending" as const,
    energy: 30,
  },
];

function RadialOrbitalTimeline() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-cyan-500 border-cyan-400";
      case "in-progress":
        return "text-black bg-white border-cyan-400";
      case "pending":
        return "text-white bg-cyan-900/40 border-cyan-500/50";
      default:
        return "text-white bg-cyan-900/40 border-cyan-500/50";
    }
  };

  return (
    <div
      className="w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center bg-[#0a1628] overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central glowing orb */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-cyan-400/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-cyan-400/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
          </div>

          {/* Orbit ring */}
          <div className="absolute w-[360px] h-[360px] md:w-96 md:h-96 rounded-full border border-cyan-500/20"></div>

          {/* Timeline nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Glow effect */}
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(0,212,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Node circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isExpanded
                      ? "bg-cyan-400 text-[#0a1628]"
                      : isRelated
                        ? "bg-cyan-500/50 text-[#0a1628]"
                        : "bg-[#0f2847] text-cyan-400"
                    }
                    border-2
                    ${isExpanded
                      ? "border-cyan-400 shadow-lg shadow-cyan-400/30"
                      : isRelated
                        ? "border-cyan-400 animate-pulse"
                        : "border-cyan-500/40"
                    }
                    transition-all duration-300 transform
                    ${isExpanded ? "scale-125" : ""}
                  `}
                >
                  <Icon size={20} />
                </div>

                {/* Node title */}
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs font-semibold tracking-wider font-displace
                    transition-all duration-300
                    ${isExpanded ? "text-cyan-400 scale-110" : "text-white/70"}
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-[#0a1628]/95 backdrop-blur-lg border-cyan-500/30 shadow-xl shadow-cyan-500/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-cyan-500/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-cyan-400/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white font-displace">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-cyan-500/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-cyan-400/70">
                            <Zap size={10} className="mr-1" />
                            Progress
                          </span>
                          <span className="font-mono text-cyan-400">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-cyan-500/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-cyan-400/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-cyan-400/70">
                              Connected Phases
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-cyan-500/20 bg-transparent hover:bg-cyan-500/10 text-white/80 hover:text-cyan-400 transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-cyan-400/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="bg-[#0a1628] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-cyan-400 text-sm uppercase tracking-widest mb-4">
          Process
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-displace">
          Our Process
        </h2>
        <p className="text-gray-400 max-w-2xl mb-8">
          A streamlined approach to delivering exceptional results, from concept to launch.
        </p>
      </div>
      <RadialOrbitalTimeline />
    </section>
  );
}

export default ProcessSection;
