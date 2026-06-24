"use client";

export default function LoginPage() {
  // const rsLogin = useLoginResource();

  // async function onSubmit(formData: FieldValues) {
  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     body: JSON.stringify(formData),
  //   });

  //   if (!res.ok) {
  //     console.error(await res.json());
  //     return;
  //   }

  //   window.location.href = "/dashboard";
  // }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <h2>PAGE LOGIN</h2>
      {/* <CoreCardComponent
        divClass="w-fit"
        title="Login"
        content={
          <CoreFormProvider title="Usuários" schema={rsLogin.schema} initialState={rsLogin.formStateInitial} formFields={rsLogin.formFields}>
            <CoreFormComponent onSubmit={onSubmit} submitButtonText="Entrar" className="my-4" />
          </CoreFormProvider>
        }
      /> */}
    </div>
  );
}
