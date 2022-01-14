// import classes from '../CreateGroup.module.css';

// export default function CreateGroupFooter({ closeModal }) {
//   async function createGroupHandler() {
//     if (!nameInput.value) setInputAsTouched();

//     const groupData = {
//       name: nameInput.value,
//       description: descriptionInput.value,
//     };

//     if (nameInput.value) {
//       const data = await createGroup(groupData);

//       if (data.status === 'fail') {
//         setError(
//           <p className={classes.Error}>That group name is already taken</p>
//         );
//       }
//     }
//   }

//   const cancelBtn = (
//     <button
//       onClick={closeModal}
//       className={`Global-btn-2 ${classes.CancelBtn}`}
//     >
//       Cancel
//     </button>
//   );

//   const createBtn = (
//     <button
//       className={`Global-btn-1 ${classes.ConfirmBtn}`}
//       onClick={createGroupHandler}
//     >
//       Create Group
//     </button>
//   );
// }
