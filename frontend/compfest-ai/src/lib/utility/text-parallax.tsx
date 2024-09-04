import { useEffect, useRef } from 'react';
import { textParallaxScroll } from '@lib/animations/text-parallax';
import { Box, Card, Inset, Strong, Text } from '@radix-ui/themes';
import { motion } from "framer-motion";
import "@lib/styles/etc.css";

interface ParallaxArgs {
  text: string[],
  direction?: string
}

const TextContent: ParallaxArgs[] = [
  {
    text: [
      "Communication skills",
      "Mergers and acquisitions",
      "Corporate governance",
      "3D modeling",
      "UI/UX design",
      "Data Analytics",
      "Web design principles",
      "Prototyping",
      "Marketing analytics",
      "Front-end development languages",
      "Collaboration",
      "Problem-solving",
      "Interaction design",
      "User testing",
      "Responsive design",
      "Usability testing",
      "Risk management",
      "Legal strategy",
    ],
    direction: "8%"
  },
  {
    text: [
      "Product design principles",
      "Prototyping and wireframing",
      "User research",
      "User testing",
      "UI/UX design",
      "3D modeling",
      "Collaboration",
      "Creativity",
      "Software proficiency",
      "Digital marketing strategies",
      "SEO Skills",
      "Social media marketing",
      "Email marketing",
      "Data interpretation",
      "Marketing automation tools"
    ],
    direction: "-10%"
  },
  {
    text: [
      "Strategic IT planning",
      "Leadership and management",
      "Budgeting",
      "IT governance",
      "Vendor management",
      "Cybersecurity",
      "Project management",
      "Cloud computing",
      "Network infrastructure",
      "Enterprise software systems",
      "Marketing analytics",
      "Data visualization",
      "Market research",
      "Google Analytics",
      "Marketing automation"
    ],
    direction: "-15%"
  },
  {
    text: [
      "Data collection",
      "Survey design",
      "Qualitative research",
      "Quantitative research",
      "Report writing",
      "Automation and scripting",
      "Continuous Integration",
      "Containerization",
      "Infrastructure as Code",
      "Cloud platforms",
      "Monitoring",
      "Troubleshooting",
      "Legal counsel",
      "Contract negotiation",
      "Litigation support",
      "Enterprise"
    ],
    direction: "-15%"
  },
  {
    text: [
      "Client representation",
      "Legal writing",
      "Regulatory compliance",
      "E-filing",
      "Attention to detail",
      "Multitasking",
      "Legal terminology",
      "Technology proficiency",
      "Medical knowledge",
      "Patient care",
      "Empathy",
      "Graphic design tools",
      "Visual communication",
      "Typography",
      "Creativity"
    ],
    direction: "5%"
  },
];



export const TextParallax = ({
  className,
  onSkillClick
}: {
  className?: string,
  onSkillClick: (skill: string) => void
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const trigger = triggerRef.current;

    if (trigger && paragraphRefs.current.length > 0) {
      paragraphRefs.current.forEach((paragraph) => {
        if (!paragraph) return;
        const direction = paragraph.dataset.direction;
        textParallaxScroll({
          select: paragraph,
          direction: direction,
          trigger: trigger,
          start: '0'
        });
      });
    }
  }, []);

  return (
    <div
      id="trigger"
      ref={triggerRef}
      className={'text-nowrap w-full overflow-hidden flex justify-center items-center flex-col gap-4 uppercase font-restart'}
      style={{ paddingTop: '100px', paddingBottom: '110px' }}
    >
      {TextContent.map((content, index) => {
        return (
          <div
            key={index}
            className="text-2xl flex flex-row gap-3 relative"
            ref={(el: any) => (paragraphRefs.current[index] = el)}
            data-direction={content.direction}
          >
            {content.text.map(s => (
              <Box
                onClick={() => onSkillClick(s)}
                key={s}
                className="px-1 py-2 font-restart cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 1.5, // Optional: To control the duration of the transition
                  }}
                  style={{ perspective: "1000px"}}
                >
                  <Card
                    asChild
                    className="custom-card">
                    <div>
                      <Text
                        as="div"
                        size="3"
                        className="font-medium text-center text-white"
                      >
                        {s}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </div>
        )
      })}
    </div>
  );
};