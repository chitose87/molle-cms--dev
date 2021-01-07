import {Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

export class OptionComp extends Vue {
  @Prop() label?: string;
  @Prop() public value!: any;
  @Emit()
  public input(value: any) {}

  protected get localValue(): any {
    return this.value;
  }

  protected set localValue(value: any) {
    this.input(value);
  }
}
