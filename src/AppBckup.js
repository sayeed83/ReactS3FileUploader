import React,{useState} from "react";
import { Provider } from "react-redux";
import Table from 'react-bootstrap/Table';
import { uploadFile } from 'react-s3'; 
window.Buffer = window.Buffer || require("buffer").Buffer;
// import { PersistGate } from "redux-persist/integration/react";



// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }

const config = {
    bucketName: '',
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
}

function App({ store, persistor }) {
	const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
		console.log(" e.target.files[0] ", e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async(file) => {
		let tempFileData = file.name.split('.');
		let fileExtension = tempFileData.pop();
		tempFileData = tempFileData[0].split(' ').join('_'); // Replacing space with _ for name of a file
        const fileName = `${tempFileData}_${new Date().getTime()}.${fileExtension}`;
        var renamedFile = new File([file], fileName);
        console.log(" fileName ", fileName);
		// let fileUploadResponse = await (uploadFile);
		// console.log(" fileUploadResponse ",fileUploadResponse);

        // uploadFile(renamedFile, config)
        // .then(data => {
		// 	console.log(" data ", data);
		// })
        // .catch(err => {
		// 	console.log(" Error ", err);
		// })
    }
	

	const handleSubmit = (file) => {
		console.log(' testing ', file);
	}

	const handleUploadChange = (e) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const fileLink = URL.createObjectURL(file);
			console.log(" fileLink ", fileLink);
		}
	}

  	return (
		<Provider store={store}>
			{/* <PersistGate persistor={persistor}> */}
			<div className="App">
				<input type="file" onChange={handleFileInput}/>
				<button className="btn btn-primary" onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
			
				{/* <div>
					<input type="file" onChange={handleUploadChange}     
					accept="image/*"  />
					<button className="btn btn-primary" onClick={() => handleSubmit(selectedFile)}> Upload to S3s</button>
				</div> */}
			</div>
			{/* </PersistGate> */}
		</Provider>
  	);
}

export default App;
