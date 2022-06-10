import { Component, For } from 'solid-js';
import { Taxpayer } from './processFile';
import styled from './styles.module.scss';

interface Props {
  taxpayerData: Taxpayer;
}

const DisplayTable: Component<Props> = ({ taxpayerData }) => (
  <div class={styled.displayTable}>
    <For each={taxpayerData}>
      {(section) => (
        <>
          <h3>{section.sectionName}</h3>
          <table>
            <tbody>
              <For each={section.fields}>
                {(field) => (
                  <tr>
                    <td>{field.fieldName}:</td>
                    <td>{field.value}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </>
      )}
    </For>
  </div>
);

export default DisplayTable;
