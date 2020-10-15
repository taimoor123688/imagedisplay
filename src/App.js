import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class  App extends React.Component {

    constructor(props) {
        super(props);
        this.getFolders();
    }

    state={
        loginform:true,
        registrationForm:false,
        home:false,
        uid:'',
        folderslist:[],
        imagesArray:[],
        folderName:'Select Folder First',
        message:'',
        file:null,
        email:'',
        password:''};

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onFileChange=(e) =>{
        this.setState({file:e.target.files[0]});
    }

    loginPage =(e) =>{
        e.preventDefault();
        this.setState({registrationForm: false, loginform:true});

    }
    accountPage=(e) =>{
        e.preventDefault();
        this.setState({registrationForm: true, loginform:false});
    }
    createFolder= (e) => {
        e.preventDefault();
        axios.get(`http://localhost/createfolder.php`)
            .then(res => {
                this.setState({folderslist: res.data});
            })
            .catch(error =>{
                console.log("Error while creating Folder:" +error);
            })
    }

    getFolders = () => {
        axios.get(`http://localhost/getfolder.php`)
            .then(res => {
                this.setState({folderslist:res.data});
            })
            .catch(error =>{
                console.log("Error while getting Folder:" +error);
            })
    }

    deleteImage =imgName => (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('iname',imgName)
        axios.post(`http://localhost/deleteimage.php`, formData )

            .then(res => {
                if(res.data ==="deleted Image"){
                    this.setState({message:"Image Deleted Succecfully"})
                }
            })
            .catch((error) =>{

                alert("error while deleting image : "+error);

            })
    }

     itemsClicked = folderName => () => {

        this.setState({folderName:folderName});
        const formData = new FormData();
        formData.append('uid',this.state.uid)
        formData.append('folderName',folderName)

         axios.post(`http://localhost/getimage.php`, formData )
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({imagesArray:res.data});
            })
    }

    imageUpload = (e) =>{
        e.preventDefault();
        if(this.state.folderName !=="Select Folder First"){
            const formData = new FormData();
            formData.append('uid',this.state.uid)
            formData.append('folderName',this.state.folderName)
            formData.append('file',this.state.file)

            axios.post(`http://localhost/uploadimage.php`, formData)
                .then(res => {
                    this.itemsClicked(this.state.folderName);
                    this.setState({message:"Image Upload Successfully"});
                })
                .catch(error =>{
                    alert("error while uploading image: "+error);
                })
        }
    }
    createAccount=(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userEmail',this.state.email)
        formData.append('userPassword',this.state.password)
        axios.post(`http://localhost/signup.php`, formData )

            .then(res => {
                console.log(res);
                console.log(res.data);

                if(res.data==="true")
                {
                    this.setState({registrationForm: false, loginform:true, home:false, email:"", password:""});
                }
                else{
                    alert(res.data);

                }
            })
    }

    authLogin=(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userEmail',this.state.email)
        formData.append('userPassword',this.state.password)
        axios.post(`http://localhost/signin.php`, formData )

            .then(res => {
                let userId = res.data["user-id"];

                console.log(res.data);

                if(res.data["error"]==="false")
                {
                    this.setState({registrationForm: false, loginform:false, home:true, uid:userId });
                    this.getFolders();
                }
                else{
                    alert("error: "+res.data);
                }
            })

            .catch((error) =>{

                alert("error: "+error);
            })
    }

    home=() =>{
        this.setState({registrationForm: false, loginform:false, home:true});
    }
    logout = () =>{
        this.setState({loginform:true, home:false});
    }
    render(){

     let {loginform,registrationForm,home}=this.state;

     return (
         <div>

             {loginform && (
                 <div className={"justify-content-center d-flex "}>
                     <form className="form-signin text-center">

                         <h1 className="h3 mb-3 font-weight-normal">Sign-In</h1><br/>
                         <input type="email" name="email"  className=" form-control" placeholder="Email address"
                                value={this.state.email} onChange={this.onChange} required/>

                         <br/><br/>

                         <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" placeholder="Password" required/>

                         <div className="checkbox mb-3">
                             <label>
                                 <input type="checkbox" name="remember"/> Remember me</label>
                         </div>
                         <button className="btn btn-lg btn-primary btn-block" name="submit" onClick={this.authLogin}>Sign in</button>
                         <p className="mt-5 mb-3 text-muted"></p>

                         <button name="createAccount" onClick={this.accountPage} >Create Account </button>


                     </form>
                 </div>
             )}
             
             {registrationForm && (
                 <div className={"registration-form  d-flex justify-content-center "}>
                     <form id="sign_up">

                         <h1 className="h3 mb-3 text-center font-weight-normal">Sign-Up</h1><br/>

                         <div className="form-icon">
                             <span><i className="icon icon-user"></i></span>
                         </div>
                         <div className="form-group">
                             <input type="email" name="email" placeholder="Email" className="form-control item" 
                                    value={this.state.email} onChange={this.onChange} required />
                         </div>
                         <div className="form-group">
                             <input type="password" name="password" placeholder="Password" className="form-control item"
                                    value={this.state.password} onChange={this.onChange} required/>
                         </div>
                         <div className="form-group">
                             <button className="btn btn-lg btn-primary btn-block" name="create Account"
                                     onClick={this.createAccount}>Create Account</button>

                         </div>
                         <button onClick={this.loginPage} >Already have an account? </button>

                     </form>

                 </div>
             )}


             {home &&(
                 <div className="container">
                     <Header/>
                     <form name="form" method="post" action="" encType='multipart/form-data'>
                         <div className="row">
                             <div className="col-sm-4 border">
                                 <br/><br/>
                                 <h3>Folders Details</h3>    <hr/>
                                 <button type="submit" id="Create-Folders" className="btn btn-primary" onClick={this.createFolder}>Create Folders  </button>
                                 <br/><br/><hr/>

                                 <ul style={{listStyleType: "none", cursor: "pointer"}}>
                                     {this.state.folderslist.map((list) => (
                                         <li onClick={this.itemsClicked(list)}>{list}</li>
                                     ))}
                                 </ul>


                             </div>

                             <div className="col-8 border">
                                 <div className={"alert alert-success bg-light "+this.state.message ?"d-block":"d-none"}>
                                     {this.state.message}
                                 </div>
                                 <br/><br/>
                                 <h3 id="View-con">{this.state.folderName}</h3>
                                 <hr/>

                                     <div className="row" id="btns" >

                                             <div className="col-4">
                                                 <button className=" btn-primary" type="submit"
                                                         onClick={this.imageUpload} name="img-upload">Upload Image
                                                 </button>
                                                 <input type="file" name="fileName" onChange={this.onFileChange} />

                                             </div>
                                             <div className="col-6 d-flex flex-column align-items-end">
                                                 <button className="btn-primary" name="logout" onClick={this.logout}>Logout</button>
                                             </div>
                                     </div>

                                     <hr/><br/>


                                 <div className="row" id="img-result">

                                         {this.state.imagesArray.map((temp) => (
                                             <div className="col-4">
                                                 <img src={"http://localhost/"+temp} width="100%" ></img>
                                                 <button className="btn btn-danger btn-primary del-img alert-danger"
                                                        onClick={this.deleteImage(temp)} >Delete
                                                 </button>
                                             </div>

                                         ))}
                                     </div>


                             </div>
                         </div>
                     </form>
                 </div>
             )}

         </div>

     );
 }


}

export default App;


