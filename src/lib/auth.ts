export async function signIn(username: string, password: string): Promise<boolean> {
  // Replace this with your actual authentication logic
  return username === 'Admin' && password === 'Admin';
}
