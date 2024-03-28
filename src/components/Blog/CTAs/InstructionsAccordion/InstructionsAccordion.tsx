import { InstructionsAccordionContainer, InstructionsAccordionItem } from '.';

interface InstructionsItemLink {
  label: string;
  url: string;
}
export interface InstructionItemProps {
  title: string;
  step?: string;
  link?: InstructionsItemLink;
  url?: string;
}

interface InstructionsAccordionProps {
  data: InstructionItemProps[];
}

export const InstructionsAccordion = (data: InstructionsAccordionProps) => {
  if (!data) {
    return;
  }
  return (
    <InstructionsAccordionContainer>
      {data.data?.map((el, index) => (
        <InstructionsAccordionItem
          key={`instructions-accordion-item-${index}`}
          index={index}
          title={el.title}
          step={el.step}
          link={el.link}
        />
      ))}
    </InstructionsAccordionContainer>
  );
};
