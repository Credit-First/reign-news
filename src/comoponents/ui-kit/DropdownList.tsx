import { useState } from 'react';

interface Props {
  options: any[];
  selected: number;
  selectionChanged?: (index: number) => void
}

function Option({ label, onClick }: any) {
  return <div className="cursor-pointer flex items-center font-roboto text-gray-200 px-2" onClick={onClick}>
    <img className="mr-2" src={`/icons/${label.toLowerCase()}.png`} alt={label}/>
    <span>{label}</span>
  </div>
}

export default function DropdownList({ options, selected, selectionChanged }: Props) {
  const [opened, setOpened] = useState(false);
  return <div className="w-60">
    <div className="border border-gray-100 rounded py-1">
      <Option label={options[selected]} onClick={() => setOpened(!opened)}/>
    </div>
    {opened && <div className="w-60 absolute bg-white">{options.map((option, index) =>
      <div key={index} className="py-2">
        <Option label={option} onClick={() => {
          selectionChanged && selectionChanged(index);
          setOpened(false);
        }}/>
      </div>)}
    </div>}
  </div>
}