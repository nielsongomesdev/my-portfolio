"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Lock, Key } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Image from "next/image";
import { projectsData } from "@/data";
import { useTranslations } from "next-intl";

export const Projects = () => {
  const t = useTranslations("projects");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = projectsData.length;
  const progressPercentage = totalSlides > 1 ? (activeIndex / (totalSlides - 1)) * 100 : 100;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateSliderState = () => {
      const cards = slider.querySelectorAll<HTMLElement>("[data-project-card]");
      if (cards.length === 0) return;

      const viewportCenter = slider.scrollLeft + slider.clientWidth / 2;
      let closestCard = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestCard = index;
        }
      });

      setActiveIndex(closestCard);
    };

    updateSliderState();
    slider.addEventListener("scroll", updateSliderState, { passive: true });
    window.addEventListener("resize", updateSliderState);

    return () => {
      slider.removeEventListener("scroll", updateSliderState);
      window.removeEventListener("resize", updateSliderState);
    };
  }, []);

  return (
    <section id="projects" className="relative w-full flex items-center min-h-screen lg:h-screen pt-28 pb-12 lg:py-0 overflow-hidden z-10">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-8">
        <div className="lg:w-[35%] flex flex-col z-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("title")} <span className="text-brand-primary">{t("titleAccent")}</span>
          </h2>
          <p className="text-brand-muted text-base md:text-lg leading-relaxed">
            {t("description")}
          </p>
        </div>
        <div className="lg:w-[55%] w-full relative">
          <div
            ref={sliderRef}
            className="flex lg:grid lg:grid-cols-2 gap-4 lg:gap-6 w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
          {projectsData.map((project) => (
            <div
              key={project.id}
              data-project-card
              className="group relative shrink-0 w-[85vw] sm:w-100 lg:w-full snap-center lg:snap-none aspect-4/3 lg:aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black"
            >
              <Image
                src={project.image}
                alt={`Capa do projeto ${project.title}`}
                fill
                sizes="(min-width: 1024px) 27vw, (min-width: 640px) 400px, 85vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/80 to-black/10 lg:bg-none lg:bg-black/85 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end lg:justify-center p-5 lg:p-4 text-center z-10">
                <div className="translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center w-full justify-center">
                  <h3 className="text-xl lg:text-lg font-bold text-white mb-2 leading-tight px-2">
                    {project.title}
                  </h3>

                  {project.credentials && (
                    <div className="mb-3 flex items-center gap-1.5 bg-white/10 text-white/90 px-2 py-1 rounded-md text-[10px] font-medium">
                      <Key size={12} className="text-brand-primary shrink-0" />
                      <span>{project.credentials}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap justify-center gap-1.5 mb-5 px-2">
                    {project.techs.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] lg:text-[9px] font-medium text-brand-muted uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 lg:gap-2">
                    {project.isPrivate ? (
                      <div className="flex items-center gap-1.5 px-3 lg:px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-brand-muted cursor-not-allowed transition-colors">
                        <Lock className="w-3.5 h-3.5" /> <span className="text-[13px] lg:text-xs font-medium">{t("private")}</span>
                      </div>
                    ) : (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 lg:px-2.5 py-1.5 bg-white/10 hover:bg-brand-primary rounded-lg text-white transition-colors">
                        <FiGithub className="w-3.5 h-3.5" /> <span className="text-[13px] lg:text-xs font-medium">GitHub</span>
                      </a>
                    )}
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 lg:px-2.5 py-1.5 bg-brand-primary hover:bg-brand-primary/80 rounded-lg text-white transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> <span className="text-[13px] lg:text-xs font-medium">{t("live")}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="lg:hidden shrink-0 w-1" />
          </div>

          <div className="lg:hidden mt-2 flex items-center justify-between gap-4">
            <span className="text-[11px] tracking-wide uppercase text-brand-muted/80">
              {t("swipeHint")}
            </span>

            <div className="flex items-center gap-2" aria-hidden>
              <div className="w-20 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-primary transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-[11px] font-medium text-white/80 min-w-9 text-right">
                {activeIndex + 1}/{totalSlides}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
