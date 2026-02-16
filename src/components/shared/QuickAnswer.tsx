interface QuickAnswerProps {
  question: string;
  answer: string;
}

export function QuickAnswer({ question, answer }: QuickAnswerProps) {
  return (
    <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4 mb-8">
      <p className="font-semibold mb-1">{question}</p>
      <p className="text-muted-foreground text-sm">{answer}</p>
    </div>
  );
}
