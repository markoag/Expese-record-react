import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  readonly label?: string;
  readonly amount: number;
};

export default function AmountDisplay( { label, amount }: AmountDisplayProps ) {
  return (
    <p className="text-blue-600 text-2xl font-bold">
        {label && `${label}: `}
        <span className="font-black text-black">{ formatCurrency(amount) }</span>
    </p>
  )
  
}
