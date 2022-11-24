export function Animal({type, name, age}) {
	return (
		<li>
			<strong>{type}</strong> {name} ({age} years old)
		</li>
	);
}