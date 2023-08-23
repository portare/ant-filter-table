import { useEffect, useState } from "react";
import { api } from "./api.ts";
import { columnsConfig } from "./columns.config.ts";
import { FilterTable } from "./components";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true)
      api.get('https://jsonplaceholder.typicode.com/users').then(({data}) => setData(data)).finally(() => {
        setLoading(false)
      })

  }, [])

  return (
    <FilterTable
      dataSource={data}
      columns={columnsConfig}
      loading={loading}
      rowKey='id'
    />
  )
}

export default App
