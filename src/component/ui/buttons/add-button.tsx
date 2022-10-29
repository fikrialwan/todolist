import { PluxIcon } from "../icons";

interface Props {
  onClick: () => void;
  datacy: string;
}

export const AddButton = ({ onClick, datacy }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex py-3 px-5  bg-custom-blue gap-2 rounded-full items-center"
      data-cy={datacy}
    >
      <PluxIcon /> <span className="text-white font-semibold mr-1">Tambah</span>
    </button>
  );
};
