import { columnsConfig } from "./columns.config.ts";
import { FilterTable } from "./components";
import { TComment } from "./types.ts";

function App() {

  return (
    <FilterTable<TComment>
      url="https://jsonplaceholder.typicode.com/comments"
      columns={columnsConfig}
      rowKey='id'
    />
  )
}

export default App
