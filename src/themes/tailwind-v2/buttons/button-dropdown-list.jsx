import Icon from "../../../components/common/icon";

const ButtonDropdownList = ({ buttons }) => {
  return (
    <ul className="py-1 text-sm text-gray-700 dark:text-gray-20">
      {buttons.map((button) => (
        <li>
          <a
            key={button.key}
            href={button.url ? button.url : ""}
            target={button.newTab ? "_blank" : undefined}
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            rel="noreferrer"
            onClick={
              button.onClick
                ? (event) => {
                    event.preventDefault();
                    if (button.onClick) {
                      button.onClick({
                        primaryKeyValue: button.primaryKeyValue,
                      });
                    }
                  }
                : undefined
            }
          >
            {button.icon && (
              <>
                <Icon icon={button.icon} />
                &nbsp;&nbsp;
              </>
            )}
            {button.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ButtonDropdownList;
