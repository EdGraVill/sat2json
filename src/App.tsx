import { Component, createEffect, createSignal, JSX } from 'solid-js';
import selectedFile from './selectedFile';
import processFile, { Taxpayer } from './processFile';
import styles from './styles.module.scss';
import DisplayJSON from './DisplayJSON';
import DisplayTable from './DisplayTable';

const App: Component = () => {
  const [getFile, setFile] = selectedFile;
  const [getData, setData] = createSignal<Taxpayer | undefined>(undefined);
  
  const onChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const input = event.currentTarget;

    setFile(input.files?.[0]);
  };

  createEffect(async () => {
    const file = getFile();
    if (file) {
      const data = await processFile(file);

      setData(data);
    }
  });

  return (
    <div class={styles.container}>
      <h1 class={styles.title}>Información Fiscal</h1>
      <p class={styles.description}>Cargando tu Constancia de Situación Fiscal o tu Cédula de Identificación Fiscal</p>
      <label class={styles.fileInput}>
        Seleccionar Archivo
        <input type="file" onChange={onChange} />
      </label>
      {getData() && (
        <div class={styles.display}>
          <DisplayJSON taxpayerData={getData()!} />
          <DisplayTable taxpayerData={getData()!} />
        </div>
      )}
    </div>
  );
};

export default App;
