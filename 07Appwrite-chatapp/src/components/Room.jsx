import React, { useEffect, useState } from "react";
import { databases, client } from "../appwrite/config";
import { CollectionIdMessages, databaseId } from "../appwrite/env";
import { ID, Query, Role, Permission } from "appwrite";
import Header from "./Header";
import { useAuth } from "../util/authContext";

function Room() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  const getMessage = async () => {
    const response = await databases.listDocuments(
      databaseId,
      CollectionIdMessages,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    setMessages(response.documents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
      user_id: user.$id,
      username: user.name,
    };

    const permissions = [Permission.write(Role.user(user.$id))];

    const response = await databases.createDocument(
      databaseId,
      CollectionIdMessages,
      ID.unique(),
      payload,
      permissions
    );

    setMessageBody("");
  };

  const handleDelete = async (id) => {
    await databases.deleteDocument(databaseId, CollectionIdMessages, id);
  };

  useEffect(() => {
    getMessage();

    const channel = `databases.${databaseId}.collections.${CollectionIdMessages}.documents`;

    const unsubscribe = client.subscribe(channel, (response) => {
      if (
        response.events[1] === "databases.*.collections.*.documents.*.delete"
      ) {
        setMessages((prev) =>
          prev.filter((message) => message.$id !== response.payload.$id)
        );
      } else if (
        response.events[1] === "databases.*.collections.*.documents.*.create"
      ) {
        setMessages((prev) => [response.payload, ...prev]);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-amber-400 flex justify-center items-center px-50 pt-1">
        <div className="bg-blue-400 w-full text-white p-5 rounded-b-xl">
          <form onSubmit={handleSubmit}>
            <div className="flex mb-5">
              <textarea
                className="border w-full rounded-l border-r-0 focus:outline-0 p-1"
                required
                maxLength="1000"
                placeholder="say something..."
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
              ></textarea>
              <button
                className="bg-green-400 py-1 font-bold border border-l-0 rounded-r px-4"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
          <Header />
          <div>
            {messages.map((message) => (
              <div key={message.$id}>
                <div className="flex gap-3">
                  {message.username ? (
                    <div>{message.username}</div>
                  ) : (
                    <div>anonymous</div>
                  )}
                  <div className="text-sm">
                    {new Date(message.$createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="bg-cyan-600 inline-block p-2 rounded-2xl mb-1">
                    {message.body}
                  </div>
                  {message.$permissions[1].includes(
                    'delete("user:67f02abb0011dadfde71")'
                  ) ? (
                    <img
                      className="w-9 h-9 bg-red-500 p-1 rounded-lg"
                      src="/public/delete.png"
                      alt="delete"
                      onClick={() => handleDelete(message.$id)}
                    />
                  ) : (
                    <div></div>
                  )}

                  {/* <button className="bg-red-500 px-3 rounded-xl">Delete</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
