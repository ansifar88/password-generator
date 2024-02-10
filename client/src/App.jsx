
import { Card, CardBody, Checkbox, CardHeader, Slider, Typography, Button, Tooltip, Progress, Switch } from "@material-tailwind/react"
import { ClipboardDocumentListIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"
import axios from "axios"
export default function App() {
	const [range, setRange] = useState(8)
	const [capital, setCapital] = useState(false)
	const [small, setSmall] = useState(false)
	const [number, setNumber] = useState(false)
	const [special, setSpecial] = useState(false)
	const [password, setPassword] = useState(false)
	const [count, setCount] = useState(0);
	const [copy, setCopy] = useState(false);
	const handleRangeChange = (event) => {
		const newValue = Math.floor(event.target.value)
		setRange(newValue)
	}
	const handleCapital = () => setCapital(!capital)
	const handleSmall = () => setSmall(!small)
	const handleNumber = () => setNumber(!number)
	const handleSpecial = () => setSpecial(!special)
	const showPass = () => setPassword(!password)
	const trueCount = [capital, small, number, special].filter(Boolean).length;
	const generatePassword = async () => {
		try {
			const response = await axios.post("http://localhost:8800/generate", {
				range,
				capital,
				small,
				number,
				special,
			})
			if (response.data.password) {
				setPassword(response.data.password)
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.log(error.message);
		}

	}
	const copyToClipboard = () => {
		const el = document.createElement("textarea");
		el.value = password;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		setCopy(true);
		toast.success("copied to clipboard")
		setTimeout(() => setCopy(false), 2000);
	};
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				hideProgressBar={true}
				theme="colored"

			/>
			<div className="flex justify-center items-center h-screen bg-blue-gray-300">
				<Card className="h-[36rem] w-[28rem] rounded-md flex justify-center items-center bg-[#0a0e31]">
					<CardHeader className="bg-transparent  rounded-md p-2">
						<Typography variant="h5" className="text-white ">GENERATE PASSWORD</Typography>
					</CardHeader>
					<CardBody className="w-[28rem]">
						<div className="flex items-center gap-2 my-1 relative bg-[#282b44] h-14 px-3 rounded-md">
							<Typography className="text-white">8</Typography>
							<Tooltip placement="top" content={range}>

								<Slider
									defaultValue={range}
									min={8}
									max={16}
									onChange={handleRangeChange}
									barClassName=" bg-[#212d121]"

								/>
							</Tooltip>

							<Typography className="text-white">16</Typography>
						</div>

						<div className="bg-[#282b44] h-14 my-1 flex items-center rounded-md justify-between px-3">
							<Typography className="text-white">Include Uppercase </Typography>
							
							<Switch
								onClick={handleCapital}
								id="custom-switch-component"
								ripple={false}
								className="h-full w-full checked:bg-[#4d90f5]"
								containerProps={{
									className: "w-11 h-6",
								}}
								circleProps={{
									className: "before:hidden left-0.5 border-none",
								}}
							/>
						</div>
						<div className="bg-[#282b44] h-14 my-1 flex items-center rounded-md justify-between px-3">
							<Typography className="text-white">include Lowercase</Typography>
							
							
							<Switch
								onClick={handleSmall}
								id="custom-switch-component1"
								ripple={false}
								className="h-full w-full checked:bg-[#4d90f5]"
								containerProps={{
									className: "w-11 h-6",
								}}
								circleProps={{
									className: "before:hidden left-0.5 border-none",
								}}
							/>
						</div>
						<div className="bg-[#282b44] h-14 my-1 flex items-center rounded-md justify-between px-3">
							<Typography className="text-white">Include Numbers</Typography>
							
							<Switch
								onClick={handleNumber}
								id="custom-switch-component2"
								ripple={false}
								className="h-full w-full checked:bg-[#4d90f5]"
								containerProps={{
									className: "w-11 h-6",
								}}
								circleProps={{
									className: "before:hidden left-0.5 border-none",
								}}
							/>
						</div>
						<div className="bg-[#282b44] h-14 my-1 flex items-center rounded-md justify-between px-3">
							<Typography className="text-white">Include Symbols</Typography>
							
							<Switch
								onClick={handleSpecial}
								id="custom-switch-component3"
								ripple={false}
								className="h-full w-full checked:bg-[#4d90f5]"
								containerProps={{
									className: "w-11 h-6",
								}}
								circleProps={{
									className: "before:hidden left-0.5 border-none",
								}}
							/>
						</div>
						<div>
							<div className="mb-2 flex items-center justify-between gap-4 min-h-7">
								<Typography color={trueCount === 0 ? "red" : trueCount === 1 ? "red" : trueCount === 2 ? "blue" : trueCount === 3 ? "amber" : "green"} variant="h6">
									{trueCount === 0 ? " " : trueCount === 1 ? "Very Weak" : trueCount === 2 ? "Weak" : trueCount === 3 ? "Medium" : "Strong"}
								</Typography>
							</div>
							<div >

							<Progress
								value={(trueCount / 4) * 100}
								color={trueCount === 0 ? "red" : trueCount === 1 ? "red" : trueCount === 2 ? "blue" : trueCount === 3 ? "amber" : "green"}
								className="mt-3"
								/>
								</div>
						</div>
						{password ? (
							<>
								<div className="gap-2 flex justify-between ">
									<Card className=" h-12 w-60 rounded-md  p-1 flex-row justify-between items-center mt-7 bg-[#282b44]" shadow={false}>
										<div>
											<Typography className="text-white ps-1">{password}</Typography>
										</div>
										{!copy ? (
											<div>
												<ClipboardDocumentListIcon className="h-9 w-9 p-1 rounded-md text-white bg-blue-400 cursor-pointer" onClick={copyToClipboard} />
											</div>
										) : (
											<div>
												<ClipboardDocumentListIcon className="h-9 w-9 p-1 rounded-md text-white bg-blue-100 cursor-pointer" />
											</div>

										)
										}
									</Card>
									<div>
										<Button variant="filled" className="flex items-center mt-7 h-12 gap-1 w-36 bg-blue-700" onClick={generatePassword}>
											Regenerate
											
										</Button>

									</div>
								</div>
							</>
						) : (
							<div className="flex justify-center mt-10  w-full">
								<Button className="w-full bg-blue-700" variant="filled" onClick={generatePassword}>Generate</Button>
							</div>
						)}

					</CardBody>
				</Card>
			</div>
		</>
	)
}