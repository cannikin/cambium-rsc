const Blank = ({ title, subtitle }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-lg text-neutral-500">{title}</h2>
        {subtitle && (
          <p
            className="text-neutral-600"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
      </div>
    </div>
  )
}

export default Blank
