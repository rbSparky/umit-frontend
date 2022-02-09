module.exports = {
		eslint: {
			ignoreDuringBuilds: true,
		},
    reactStrictMode: true,
    serverRuntimeConfig: {
        secret: 'bigsecret'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}
