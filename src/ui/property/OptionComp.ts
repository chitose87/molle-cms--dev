import {Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

export class OptionComp extends Vue {
  @Prop() label?: string;
  @Prop() public value!: string;
  @Emit()
  public input(value: string) {}

  private get localValue(): string {
    return this.value;
  }

  private set localValue(value: string) {
    this.input(value);
  }
}
