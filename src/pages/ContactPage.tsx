import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card p-6"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Contact <span className="gradient-text">Us</span>
                </h1>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-2 bg-dark-100 border border-dark-50 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 bg-dark-100 border border-dark-50 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                            Message
                        </label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            className="w-full px-4 py-2 bg-dark-100 border border-dark-50 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <Send size={18} />
                        Send Message
                    </button>
                </form>

                {result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`mt-4 p-4 rounded-lg ${result === "Form Submitted Successfully"
                                ? "bg-success/20 text-success"
                                : "bg-error/20 text-error"
                            }`}
                    >
                        {result}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
