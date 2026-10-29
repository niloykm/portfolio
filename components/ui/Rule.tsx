type RuleProps = {
  className?: string;
  strong?: boolean;
};

export function Rule({ className = '', strong = false }: RuleProps) {
  return (
    <hr
      className={`border-0 border-t ${
        strong ? 'border-border-strong' : 'border-border'
      } ${className}`}
    />
  );
}
