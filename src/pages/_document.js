import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body>
				<Main />
				<NextScript
					dangerouslySetInnerHTML={{
						__html: `
                document.addEventListener('contextmenu', event => event.preventDefault());
                document.addEventListener('keydown', function(event) {
                  if (event.ctrlKey && event.key === 'u') {
                    event.preventDefault();
                  }
                });
              `,
					}}
				/>
			</body>
		</Html>
	);
}
