const getData = async () => {
  const res = await fetch("https://dummyjson.com/products")
  return res.json()
}

const ServerComponent = async () => {
  const data = await getData()

  return <div>Server component</div>
}

export default ServerComponent
