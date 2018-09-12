

export declare abstract class DashboardTimetableComponent<T> {
  /**
   * Khi drag, transfer tên (hoặc id nhân viên), cùng với index của order
   * @param ev
   * @param em
   * @param key
*/
    abstract dragStart(ev, name, i): void;
}