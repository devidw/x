async function getRefreshToken(code: string) {
  const response = await fetch(`https://accounts.google.com/o/oauth2/token`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `client_id=${google.installed.client_id}&client_secret=${google.installed.client_secret}&code=${code}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob`
  })
  const json = await response.json()
  return json.refresh_token
}

let google: { installed: { client_id: string, client_secret: string } }

try {
  google = JSON.parse(Deno.readTextFileSync("google.json"))
} catch (err) {
  console.error("google.json does not exist")
  Deno.exit(1)
}

const url = `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${google.installed.client_id}&redirect_uri=urn:ietf:wg:oauth:2.0:oob`

Deno.run({
  cmd: ["open", url],
})

console.log("Enter authorization code:")

let code = ""

const decoder = new TextDecoder();
for await (const chunk of Deno.stdin.readable) {
  code = decoder.decode(chunk)
  break
}

const refreshToken = await getRefreshToken(code)
console.log(`\n\nRefresh token: ${refreshToken}`)