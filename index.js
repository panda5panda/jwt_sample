const crypto = require('crypto')

const base64 = json => {
	const jsonStr = JSON.stringify(json) // JSON形式への変換
	const jsonB64 = Buffer.from(jsonStr).toString('base64')
	const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, '')
	return jsonB64NoPadding
}

const HMAC_SHA256 = (key, message) => {
	const hash = crypto.createHmac('sha256', key).update(message).digest('base64')
	const hashNoPadding = hash.replace(/={1,2}$/, '')
	return hashNoPadding
}

const header = { alg: 'HS256', typ: 'JWT' }
const payload = { sub: '1234567890', iat: 1516239022 }
const key = 'secret'
const unsignedToken = `${base64(header)}.${base64(payload)}`
const signature = HMAC_SHA256(key, unsignedToken)
const jwt = `${unsignedToken}.${signature}`

console.log(jwt)
