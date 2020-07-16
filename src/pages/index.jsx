import React, {useState, useEffect} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import mockData from '../MOCK_DATA.json'

const IndexPage = () => {
  const [command, setCommand] = useState('')
  const [results, setResults] = useState([])

  const onSubmit = data => console.log(data);

  const onCommandChange = event => {
    setCommand(event.target.value)
  }
  
  useEffect(() => {
    setResults(mockData.filter(({first_name, last_name}) => {
      // we want to be case insensitive when checking against the name
      let regex = new RegExp(command, 'i')
      return regex.test(`${first_name} ${last_name}`)
    }))
  }, [command])

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Rolo</h1>
      <div style={{ maxWidth: `600px`, marginBottom: `1.45rem` }}>
        <form action="" onSubmit={onSubmit}>
          <input type="text" name="command" value={command} onChange={onCommandChange} />
        </form>
        {results.map(result => {
          return (
            <>
              <div key={result.first_name}>
                {result.first_name} {result.last_name}
              </div>
            </>
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage
