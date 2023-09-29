type RowProps = {
  fieldName: string
  value: string
}

export const Row = ({ fieldName, value }: RowProps): React.ReactElement => {
  return (
    <div className="flex">
      <div className="text-neutral-400 w-full">
        <p>{fieldName}:</p>
      </div>
      <div className="font-medium w-full text-justify">
        <p>{value}</p>
      </div>
    </div>
  )
}
