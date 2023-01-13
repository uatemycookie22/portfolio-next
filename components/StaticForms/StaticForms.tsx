export default function StaticForm() {
	{/*Netlify hidden form*/}
	{/*@ts-ignore*/}
	return (<form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
		<input type="text" name="body" />
		<input type="email" name="address" />
	</form>)
}