import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const messageTemplate = `Hi there, hope you're having a great day!`;

export default function Contact() {
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [showTemplate, setShowTemplate] = useState(false);

	const validateMessageWithGemini = async (message: string) => {
		try {
			const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_KEY);
			const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

			const prompt = `Please analyze if the following message appears to be genuine human communication or potentially random/spam text. Consider factors like coherence, natural language patterns, and meaningful content. Respond with only "valid" or "invalid". Message: "${message}"`;

			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = response.text().toLowerCase().trim();

			return text === 'valid';
		} catch (error) {
			console.error('Gemini validation error:', error);
			return true; // Default to accepting the message if API fails
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const message = event.target.message.value;
		const isValid = await validateMessageWithGemini(message);

		if (!isValid) {
			setModalMessage(`Hi, SusomGPT 🤖 here! It looks like your message got a bit scrambled! 🤔
        How about trying this: '${messageTemplate}' 😄`);
			setShowTemplate(true);
			setShowModal(true);
			return;
		}

		const formData = new FormData(event.target);

		try {
			const response = await fetch('https://formspree.io/f/xlekkqqk', {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			});

			if (response.ok) {
				setModalMessage('Message sent successfully! 🎉');
				setShowTemplate(false);
				setShowModal(true);
				event.target.reset();
			} else {
				const errorData = await response.json();
				setModalMessage('There was an error sending your message. Please try again. 😕');
				setShowTemplate(false);
				setShowModal(true);
				console.error('Formspree error:', errorData);
			}
		} catch (error) {
			setModalMessage(
				'There was a problem sending your message. Please check your connection and try again. 😔'
			);
			setShowTemplate(false);
			setShowModal(true);
			console.error('Submission error:', error);
		}
	};

	const useTemplate = () => {
		const messageElement = document.getElementById('message');
		if (messageElement instanceof HTMLTextAreaElement) {
			messageElement.value = messageTemplate;
		}
		setShowModal(false);
	};

	return (
		<div className="max-w-screen-xl mx-auto px-12 py-12 md:py-32">
			<h2 className="text-3xl font-bold mb-8">Contact</h2>
			<div className="w-[100%] mt-10 mx-auto md:w-[80%]">
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-text-primary">
							Your email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="border border-border text-text-secondary text-sm rounded-lg block w-full p-2.5"
							placeholder="name@name.com"
							required
						/>
					</div>
					<div className="mt-4">
						<label htmlFor="subject" className="block mb-2 text-sm font-medium text-text-primary">
							Subject
						</label>
						<input
							name="subject"
							type="text"
							id="subject"
							className="border border-border text-text-secondary text-sm rounded-lg block w-full p-2.5"
							placeholder="Optional Subject"
						/>
					</div>
					<div className="sm:col-span-2 mt-4">
						<label htmlFor="message" className="block mb-2 text-sm font-medium text-text-primary">
							Your message
						</label>
						<textarea
							required
							id="message"
							name="message"
							rows={6}
							className="border border-border text-text-secondary text-sm rounded-lg block w-full p-2.5"
							placeholder="Say Hi..."
						/>
					</div>
					<button
						type="submit"
						className="py-3 px-5 mt-4 font-medium text-center text-text-on-accent rounded-lg
              bg-accent-primary hover:bg-accent-primary/70 sm:w-fit">
						Send message
					</button>
				</form>
			</div>

			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-background p-6 rounded-lg max-w-lg w-full mx-4">
						<div className="p-4 rounded mb-4 whitespace-pre-line">{modalMessage}</div>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => setShowModal(false)}
								className="border border-border rounded px-4 py-2 text-text-primary hover:text-text-primary/60">
								Close
							</button>
							{showTemplate && (
								<button
									onClick={useTemplate}
									className="px-4 py-2 bg-accent-primary text-text-on-accent rounded hover:bg-accent-primary/70">
									Use Template
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
