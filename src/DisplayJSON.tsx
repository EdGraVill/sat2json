import { Component } from 'solid-js';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css'
import styles from './styles.module.scss';
import { Taxpayer } from './processFile';

interface Props {
  taxpayerData: Taxpayer;
}

const DisplayJSON: Component<Props> = ({ taxpayerData }) => {
  const code = <code class="language-json" /> as HTMLElement;

  code.innerHTML = Prism.highlight(JSON.stringify(taxpayerData, undefined, 2), Prism.languages.json, 'json')

  console.log(code)

  return (
    <div class={styles.displayJSON}>
      <pre class='language-json'>
        {code}
      </pre>
    </div>
  );
}

export default DisplayJSON;
