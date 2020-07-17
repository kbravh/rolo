import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {copyToClipboard, escapeRegExp} from '../util/util'

import mockData from '../MOCK_DATA.json'

const IndexPage = () => {
  const [command, setCommand] = useState('')
  const [results, setResults] = useState([])
  const [person, setPerson] = useState()
  const [subCommand, setSubCommand] = useState('')

  const subCommandRef = useRef()

  const onCommandSubmit = () => {
    setPerson(results[0])
  };

  const onSubCommandSubmit = () => {
    switch (subCommand) {
      case "@":
      case "email":
        copyToClipboard(person.email)
        break
      case "#":
      case "phone":
      case "number":
        copyToClipboard(person.phone)
        break
      default:
        break
    }
  }

  const onCommandChange = event => {
    setCommand(escapeRegExp(event.target.value))
  }

  useEffect(() => {
    setResults(mockData.filter(({ first_name, last_name }) => {
      // we want to be case insensitive when checking against the name
      let regex = new RegExp(command, 'i')
      return regex.test(`${first_name} ${last_name}`)
    }))
  }, [command])

  //move focus to the subcommand field when it appears
  useEffect(() => {
    subCommandRef && subCommandRef.current && subCommandRef.current.focus()
  }, [person])

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Rolo</h1>
      {!person &&
        <div style={{ maxWidth: `600px`, marginBottom: `1.45rem` }}>
          <form action="" onSubmit={onCommandSubmit}>
            <input tabIndex={0} type="text" name="command" value={command} onChange={onCommandChange} />
          </form>
          {results.map(result => {
            return (
              <>
                <div key={result.first_name}>
                  {result.first_name} {result.last_name}
                </div>
              </>
            )
          })
          }
        </div>
      }
      {person &&
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <form action="" onSubmit={onSubCommandSubmit}>
            <input ref={subCommandRef} type="text" value={subCommand} onChange={event => setSubCommand(event.target.value)} />
          </form>
          {/* <img href="" alt="Profile Picture" /> */}
          <div>{person.first_name} {person.last_name}</div>
          <div>{person.phone}</div>
          <div>{person.email}</div>
        </div>
      }
    </Layout>
  )
}

export default IndexPage
