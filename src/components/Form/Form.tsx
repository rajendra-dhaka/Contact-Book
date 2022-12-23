import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from '@ionic/react';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { imageOutline, personCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { storage, db } from '../../firebase';
import './Form.scss';

interface ContainerProps {}
const initialState:any = {
  // name: '',
  // phone: '',
  // email: '',
  // type: '',
  // whatsapp: false,
};

export const Form: React.FC<ContainerProps> = () => {

  const [isSubmit, setIsSubmit] = useState(false);
  const [contactData, setContactData] = useState(initialState);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<any>({});

  const history = useHistory();
  const { id }: any = useParams();
  useEffect(() => {
    // Uplaod File Function starts
    const uploadFile = () => {
      let name = new Date() + file.name;
      console.log(name);
      const storageRef = ref(storage, `profile-images/${name}`);
      const uploadTask:any = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        // Argument 1
        'state_changed',
        // Argument 2
        (snapshot: any) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is Running');
              break;
            default:
              break;
          }
        },
        // Argument 3
        (error: any) => { console.log(error) },
        // Argument 4
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setContactData((prev:any)=>({...prev,img:downloadUrl}))
          })
        }
        )
    };
      // Uplaod File Function Ends
    file && uploadFile();
 
  }, [file]);


  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, 'people', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setContactData({ ...snapshot.data() });
    }
  }

  const onInputChange = (e: any) => {
    setContactData((prev:any)=>({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpsert = async (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!id) { 
      try {
        const response = await addDoc(collection(db, 'people'), {
          ...contactData,
        });
      }
      catch {
        (error: any) => console.log(error)
           }
    }
  }
    setIsSubmit(true);
    history.replace('/');
};

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className='ion-text-center ion-margin-top'>
          <div>{id ?'Update':'Add'} Person </div>
          <IonIcon icon={personCircleOutline}></IonIcon>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={handleUpsert}>
          <IonItem>
            <IonLabel position='floating' className='ion-capitalize'>
              Name
            </IonLabel>
            <IonInput
              clearInput={true}
              name='name'
              value={contactData.name}
              type='text'
              required={true}
              onIonChange={onInputChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating' className='ion-capitalize'>
              Phone
            </IonLabel>
            <IonInput
              clearInput={true}
              type='number'
              name='phone'
              value={contactData.phone}
              required={true}
              onIonChange={onInputChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating' className='ion-capitalize'>
              Email
            </IonLabel>
            <IonInput
              clearInput={true}
              name='email'
              type='email'
              value={contactData.email}
              onIonChange={onInputChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect
              interface='popover'
              name='type'
              value={contactData.type}
              placeholder='Select Type'
              onIonChange={onInputChange}>
              <IonSelectOption value='Office'>Office</IonSelectOption>
              <IonSelectOption value='Home'>Home</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot='end'
              name='whatsapp'
              checked={contactData.whatsapp}
              onIonChange={onInputChange}></IonCheckbox>
            <IonLabel>Whatsapp</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={imageOutline}></IonIcon>
            <span className='ion-margin-start'>
              <input type='file' name='file' accept='image/*' onChange={(e: any) => setFile(e.target.files[0])} />
            </span>
          </IonItem>

          <div className='ion-margin-top ion-text-center'>
            {uploadProgress<100 ? (
              <IonSpinner name='crescent' color='secondary'></IonSpinner>
            ) : (
              <IonButton type='submit' color='primary'>
                {id?'UPDATE':'ADD'}
              </IonButton>
            )}
          </div>
        </form>
      </IonCardContent>
    </IonCard>
  );
};
