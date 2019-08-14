import React from 'react'
import ReactDOM from 'react-dom'

// Apollo Client Imports
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

// Components
import App from './App'

// Styles
import './styles/index.scss'

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				)
			if (networkError) console.log(`[Network error]: ${networkError}`)
		}),
		new HttpLink({
			uri: process.env.REACT_APP_GRAPHQL_URI,
		}),
	]),
	cache: new InMemoryCache(),
})

const Main = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	)
}

ReactDOM.render(<Main />, document.getElementById('root'))
