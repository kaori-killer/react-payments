import classnames from 'classnames';

type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  className?: string;
  disabled?: boolean;
  isClick?: boolean;
  onClick?: () => void;
};

export default function Button({
  type,
  text,
  className,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <div className={classnames('button-box', className)}>
      <span className="button-text">
        <button
          type={type}
          className="button-basic"
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </span>
    </div>
  );
}
