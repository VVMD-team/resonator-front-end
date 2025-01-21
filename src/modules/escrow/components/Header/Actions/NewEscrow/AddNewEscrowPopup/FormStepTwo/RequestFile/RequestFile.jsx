// import styles from "./RequestFile.module.css";

// import HookFormInput from "@/ui/HookFormInput";
// import FieldError from "@/ui/FieldError";
import RequestFilePlug from "./RequestFilePlug";

export default function RequestFile(/*{ register, fieldName, errorMessage }*/) {
  return <RequestFilePlug />;
  // return (
  //   <div className={styles.container}>
  //     <div className={styles.container__fieldwrap}>
  //       <HookFormInput
  //         register={register}
  //         name={fieldName}
  //         placeholder="Enter full filename"
  //         isError={errorMessage}
  //         type="text"
  //       />

  //       <FieldError message={errorMessage} />
  //     </div>

  //     <RequestFilePlug />
  //   </div>
  // );
}
