import React, { useEffect, useState } from 'react'
import { onSnapshot, collection, query, DocumentData, Query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAppSelecter } from '../app/hooks';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (collectionName: string, subCollectionName: string) => {
    const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
    const channelId = useAppSelecter((state) => state.channel.channelId);    

    useEffect(() => {

        let collectionRef = collection(
          db,
          collectionName,
          String(channelId),
          subCollectionName
        );
    
        const collectionRefOrderBy = query(
          collectionRef, orderBy("timestamp", "asc")
        );
    
        onSnapshot(collectionRefOrderBy, (snapshot) => {
          let results: Messages[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({
              timestamp: doc.data().timestamp,
              message: doc.data().message,
              user: doc.data().user,
            });
          });
          setSubDocuments(results);
        });
      }, [channelId]);
  return { subDocuments };
};

export default useSubCollection;