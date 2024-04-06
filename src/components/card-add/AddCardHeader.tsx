type AddCardHeaderProps = {
  goPrevStep: () => void;
};

export default function AddCardHeader({ goPrevStep }: AddCardHeaderProps) {
  return (
    <h1 className="page-title">
      <button type="button" className="button-basic" onClick={goPrevStep}>
        {'<'}
      </button>
      <span className="ml-10">카드 추가</span>
    </h1>
  );
}
