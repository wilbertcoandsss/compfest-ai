import { useEffect, useRef } from 'react';
import { textParallaxScroll } from '@lib/animations/text-parallax';
import { Box, Card, Text } from '@radix-ui/themes';

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
    direction: "20%"
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
    direction: "20%"
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
    direction: "-15%"
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
      className={'text-nowrap w-full overflow-hidden flex justify-center items-center flex-col gap-4 uppercase'}
      style={{paddingTop: '400px', paddingBottom: '410px'}}
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
              <Box key={s} className='px-2 py-2 font-restart cursor-pointer' onClick={() => onSkillClick(s)}>
                <Card asChild className='bg-slate-500'>
                  <div>
                    <Text as="div" size="3" weight="bold" className='font-bold text-center'>
                      {s}
                    </Text>
                    <Text as="div" color="gray" size="3" className='font-medium text-center'>
                      {s}
                    </Text>
                  </div>
                </Card>
              </Box>
            ))}
          </div>
        )
      })}

    </div>
  );
};