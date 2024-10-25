import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import slugify from "react-slugify";
import durationIcon from "../assets/duration.svg"

const Material = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const location = useLocation();
    const path = location.pathname.split('/')
    const currentRoute = path[2]
    const [material, setMaterial] = useState([
        {
            "department": "Finance",
            "chapter": "1",
            "title": "How to create an order from bahmni clinical",
            "duration": "5 Minutes",
            "tags":["bahmni,orders"],
            "image":"https://talk.openmrs.org/uploads/default/original/2X/8/88078d734fb709ac26e1e6ba9456c7fc235729a7.png"
        },
        {
            "department": "Finance",
            "chapter": "2",
            "title": "How to process quotations",
            "duration": "10 Minutes",
            "tags":[""],
            "image":"https://www.images.cybrosys.com/blog/Uploads/BlogImage/how-to-set-up-quotation-layout-in-odoo-16-sales-module-2.png"
        },
        {
            "department": "Finance",
            "chapter": "3",
            "title": "How to verify invoice payments on bahmni clinical side",
            "duration": "15 Minutes",
            "tags":[""],
            "image":"https://images.squarespace-cdn.com/content/v1/54358a40e4b0d0810faf80c2/1430814729511-HXBEUK77B8I5GUKX18HE/download.png?format=1500w"
        },
        {
            "department": "Finance",
            "chapter": "4",
            "title": "How to refund an invoice",
            "duration": "15 Minutes",
            "tags":[""],
            "image":"https://www.cybrosys.com/blog/Uploads/BlogImage/sales-return-and-refund-in-odoo-13-1.png"
        },
        {
            "department": "Finance",
            "chapter": "5",
            "title": "How to handle partial invoice payments",
            "duration": "15 Minutes",
            "tags":[""],
            "image":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEBMSFRUXGBcXFxgQGB4WFhgYFxkXFxYWFxYYHSggGBslHRgYITIhJSkrLi4uGR8zODMvNygtLisBCgoKDg0OGxAQGzQmHSAtLS0tLy81Ny0rLzctLS0uLS0tNy0vLS0vLS0vLy0uKy4rLTUrLy8tNy0vLSs1LS0rLf/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAcGBQj/xABIEAABAgMEBQYKCAUEAgMAAAABAAIDESEEEjFRBRNBYZEGIlNxgdIHFBYXMlKx0eHwFUJikpOhosEjNHJ0sjNDVPEkc4Kz4v/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAAsEQEAAQIEBgEDBAMAAAAAAAAAAQIDBBESFBMhMVFSodEVQeEFcZHwImHB/9oADAMBAAIRAxEAPwDlbPboYbJ0NznVreIFfsjKU8dp3S9vQ+jH2tpdZ7KXDnCetDZGTT9YignwMp0KpcntNQoAbehtJ57XktvF8N+LDsIwxy4914K4IfZozhNrXRYjQGmoBaygO4HFeW7crp6R/eb2VYaKYiZnrDnYPIy2iJeNlnDmebrYcwNlb1ZfnJTnkhapuPiRkXEgC0Mo0kSb6VZCk/kaRZtFNYy4HO9K9zZMrICgaAG4ToBWZ2lTQbCG0vRCJSk51JUwl1fmVzm9OfJzm3HRmL+R1qpdsbqFpM47K+sPS/P8gkHI+1bbFsGEdgFBI0vbce1aS+wsHpPif/J16fWCCDwrtmmmywq899ds69QMk48pw4ZlG5F22tyygTAlejMJBGJHOAM94oq/kRpDoB+IzvLVYVlhNIN+IZGYmdtMZCuGHZhRWokRjpTcaGdJjsOYrgnHqOHDF3cl7aDIwpEfbZ3k3yatnRD77O8tTt9hvuJvUvXhJzmmmcsRuTfEzm3j8F86rHYuJ5Uevy9UYezMc6mXeTVs6IffZ3keTVs6IffZ3lqXiZzbx+CTxM5t4/BZ3+M8PU/LW3seTLvJq2dEPvs7yPJq2dEPvs7y1HxM5t4/BHiZzbx+Cb/GeHqfk29jyZd5NWzoh99neR5NWzoh99neWo+JnNvH4I8TObePwTf4zw9T8m3seTLvJm2dEPvs7yPJm2dEPvs7y1LxM5t4/BJ4mc28fgm/xnh6n5NvY8mcN0Dabl11lBcARfEVrTtkSJ1lMcN6UaCtF274qJ3ZXtc3G6Rel1kGX2RvJ0bxM5t4/BHiZzbx+Cb/ABnh6n5TbWPJnFq0FaXCTbK1hni2K00rSRO8V3Kt5M2zov1s7y1DxM5t4/BHiZzbx+Cb/GeHqfldtY8mX+TNs6L9bO8jyZtnRfrZ3lqHiZzbx+CPEzm3j8E3+M8PU/Jt7Hky/wAmbZ0X62d5HkzbOi/WzvLUPEzm3j8EeJuzbxPuTf4zw9fk29jyZf5M2zov1s7yPJm2dF+tneWoeJnNvE+5HiZzbx+Cm/xnh6/Jt7Hky/yZtnRfrZ70eTNs6L9bPetTOjnynNksyaJ30XE+zxTf4zw9fk21jyZSeTdtFRBacfSe3aJT9LEKWxcnbYxzHOg3g0gkX2Vz+stR+i4n2eKT6MifZ4qTjsZMZaPU/KzYsTTp1f3+Gdaa0HHiPDoNnuiQBBezH71etVYnJ21loAggESreYDhIzN7nTNcBLCuK1D6LifZ4pDox/wBnis0YzF0xFMUdP3+XPZ4fl/lPL/bL4PJ21AODoAcSJNJiN5pmK0dlP8lK/QNpMIQxZQHgzMTWtJI52ydMWinqrRLPZLzLzHw3swvNffE8picykdYXFpaS6oInJwNepq677GZ5TR6n5b21nu4LSOhI7ntdDsoDQ2Ra57GzNZHmPmcRwVDyZtnRfrZ3lpf0ebtyoEpT5wNN8qdast0Y/Zd4qTj8Z9qPU/JtrPdm/Jvk/AjWZsWIGXiX+kXzMnED0XgDDLeup8GcJhsEdjiWs18QE3rshdh4u+QuCsOiorgGwnRpbA19wE1JugkTNCaLouS+noNls8SxRoUd5MQuOrlMUZtDgQQW7Ny+1cjVGVPV59FTUHBjmAXuaWzBDjVsvSvTmRIznMptssbYl2/9Uz2HaD9YGXoiorjWq4jy3sV0M8WjhrQGAANAAE7okH7zxKGcvLEAWizx5GUxzayw+uuG3udpXTV2djpKxCKBzy0TaZtddndN4SIxFKjaJqvE0NfdfvuqAOa4gS2YfNTmuUby5sIMxZ485EfVwIkfr5AK03wk2Yf7Vo7bp9r04N2OkGiez3XaGEqxHSNPTNcab9tNyIuimtE3RnNE5TdEkJmQAmfnJc03l5Yg0MECPdBvS5uP36pLby5sMZghxIFoLBKTeaBgWyMn1EiRI07QFqbNzPpKRRV2dR9CDC+7CvPOBpM54SrknN0NKt5236x2rmfODY7+t1Ee/hPm5f1qfzl2borRwZ31ng3ey6J7Pf8AoX7Th1OIzyG8pfok4XzLeSeB2Fc/5y7N0Vo4M76Tzl2borRwZ304N7saHQfQ32jl6RQNC4c91MOcdnYvA85dm6K0cGd9HnLs3RWjgzvqcG72NLoDoes7zh1ONZTxzxKBof7bvvFc/wCcuzdFaODO+jzl2borRwZ31eDd7Gl750L9ojeDI7doG8pRoiRBDjMfaMu0bVz/AJy7N0Vo4M76Tzl2borRwZ304N3saXQHQ0xIuOfpHKSPoX7bvvFc/wCcyzdFaODO+jzmWborRwZ31ODd7Gl0A0NSV52M/SPz/wBIOhvtu+8ayntlv9i8Dzl2borRwZ30ecuzdFaODO+nBu9jS946FpK+6uMnHbjsThof7bvvH8wue85dm6K0cGd9HnLs3RWjgzvpwbvY0uhOhzOd92M5BxAnOeA9ildo4kXb3GvtFe1cz5y7N0Vo4M76POXZuitHBnfTg3exk6QaLN24XT3kmZ21I9mBFERNFkgNvSlL0aYdQ+aLnPOXZuitHBnfT4XhFgOo2BaXdTWn2OTg3ezM5RGcuj0jolkeEIL3PABDpwzdM64EVGOxTWqxB4aCSLpBEg01GB5wMjvEiuVHhGgEkCBaSRiA1sxLGfOSxvCLAZ6cC0tn6zWj2uSbN2Yyy6GdOcc+curjWUOe15Jm3CRooDopuv8AGbzr0pSpdwLcpykTScp1lNcv5zLN0Vo4M76POZZuitHBnfVpovU9O2SU26aZmYjnPV1Fk0UyHHi2hrol6LdvBzpsFwSBazAHeoH6ChlkeHefKOy46UgQLrmzEhjzjUzmue85dm6K0cGd9PieEaA2V6BaROcrzWicsZTdVSLV6Jzybjk9bk/ybFlhvaIl9zn6wm7cbMNuABoJlTE513KX6GPrOoZj+IaUlTmddd68Lzl2bHU2jg3vpPOZZuitHBnfWq6b1dU1VRzlviVdXSwrA5rbgkRMHnPJPNIIxbhQUV+Cy6A2eC4vzmWborRwZ30ecuzdFaODO+scG52ZmqZ6uD0ZyjMEBwYXBs5FzZhriJTns7CJ0XrckdFW20OfbbIyG7nOYTGdLnSaXUBGY2rydC6fhQ7O+BEZU+jITGJOOMqyltotE8Dono+K1rrs48SR2jmQpbfYV9ObdNGVdM85jL9vv/14LN2uKq4mjLn/AC8SDyN0m1znCHAm55fV4MnOnO7WmP5DJQWvkFpGJK9DgCWFxzW5DAdS1Ntli0nHlKUwBPCRlenMiedZdpQyxxRjaJn+kZSpWnz1q65dtzX2ZhD5E6TaA3V2cgC7znNNBLPq/fGqrxfB5pBzrxZCBp6LwMKT66LXWwHXbros6O5w5pmaA0OyvEZTVYaPibbQfz/LnfMhsmDNcruK+zNDyK0nOZh2czMzMtxoJ9dFDaeQOkYkr0OAJT9FzRjLLq9ua1ey2VzfSjF87s50ldmaV2mU0w2J/wDyHZS3TGNcZA139ia5WL9TL4PIjSbQ0BkA3fRm5pI20PWmWjkHpF4umFAAnPmuaN1MgtTFhdhryRTaQaA7b1JzmeoYSTfEH/8AII47ifrfNN95rk49TMYHIfSTGhgh2cgTlfLXY41PswTncidJGhhWciRFXNpOeGWPvmtVskAsJLopdPAHAVcaTJ2EDs4W74zCa5TjVMYs3g/0iwkthwTOhvPBHz85KweRekyJGFZtxm2YxwyqZ9fatfvjMIvjMJrleNUx6PyH0k8EGFZ65Fo4ZKn5trf6kP8AEC22+Mwi+MwmuTjVMS821v8AUh/iBJ5trf6kP8QLbr4zCL4zCa5ONUxHzbW/1If4gR5tbf6kP8QLbr4zCL4zHFNcnGqYj5trf6kP8QJfNtb/AFIf4gW23xmEXxmE1ycapiPm1t/qQ/xAjzbW/wBSH+IFt18ZhF8ZhNcpxqmI+bW3+pD/ABAjzbW/1If4gW3XxmEXxmE1ycapiPm20h6kP8QL1Xcl9LmHDhSgyhCUMhzQ5rZSuz2jDfTFazfGYRfGYU1yzXXrjKqImGO2PkPpOGXFrIJv4zeMRORF0jM0wzCji8g9Juc17xDcWmYm9uc/atitHOa5rXXSQQHCUwTgRPJVG2R8v5h86Vk3YJYS214q65TOM4nKM46MtfyI0kQQYVnrPazbt696d5F6Sr/CsxnmWntmazWq2uCXta1sUsILSS2XOAxBnsPzMUMfiz/+QeDc5/PYpqlriSya0+D/AEjEkTDgCXqOa32KTSPIbSUch0RkGYEgRE2TJAMyZynKeMsSVsTDIAFwJzz3qsYjQ6sUY4EgZmX5jgmqTiSyo8i9JSbdhQAW7b7TOl3A4USO5IaSbIllmHW5uPbgabNgWrmOyv8AFbX7QpQYVT47sCK12SyIn+akcuUE3KmQN5J6QAAlZJNlKbmbAAJ50ArjRQRPBxpBxLiyFM1o8Ba21jwDN73AggBwYMRSo+ar0dYMxxVzlmLtT550Xo6EYcAmyxYxiGRewRC0TjPh1uRBdk1s53ZCk8V2/IKA46KtkKBO/r4rWBpk70YUpGa47QXIyPHga4RTDBncaQTeIxFHAjaTIOpvotB8D0IsscVjqObaYjSMiGQwRxC426ZiqZzSuiJpqpz/ABm8qHom1ybOBapj0pWijqVpfoJ1+ZpI2iLYRJkC0tMxIutF6QpMSvyz4rUENEzL52L063z/AKfT5T6+EMZry4FsQNbKokCZ1rM9iiLI2yMwCZ+rOmzL5pXFXtVvKNWMyub3aVEwo0qRxOe1olLLBWH3iyQiAOpN0pikp0314qbVjMo1YzKGSpZ2RQQXxmuAxAaBOkqnrrROtTYhIMOK1gyLQ6eO3hwVnVjMo1YzKhkp3Isv9ZpM8S2n1aAA7nbfrbkWZsUEX4rHDbJsp0IlxkexXNWMyjVjMqmSvag8kauI1o2zbez3/MlXEKP07N/MFfcvR1W8o1e8oTTmgst4A6yI11aSF2QkKS65qu9kbZGZicWA0mJbRsmO3dW/qt5Rqt5UMkLbwZK+C6XpSkCerYqwhxtsZnYwCe7bLr/6N/VbyjVdapkhYXXJF7S+R5wEhPYbv7Kq6HHrKOwYy5lRjdmdsttBOWxehqt5Rq95QyMgPkBecCdpCk1gzCTVdaNVvKil1gzCNYMwk1W8o1W8oF1gzCNYMwk1W8o1W8oF1gzCTWDMI1W8o1W8oF1gzCjiPnO64A7Cn6reUareUFeFfnzojSMmtlP8ypIhJHNc0Gf1hOnEKTVbyjV7ygqgRKfxWb+b7K0/NZt4SdGGNbGPhWOPFDWgRXw2GUT1WhwGLR9bfLYtT1XWjV9a1TOUt0V6ZzYLH5PvLSGaPtYdWRc1xAypdyp2T3LWeR1ljwrDBhx3gRAMHCZYz6sM1qQJDdhsmvfeyQnM7PamqzVm1XdmuMjbOXAm+9rsJSEuvrXijSDt2JzzO9e4uXH7n2rOTkyXQXKS2wYDoEFhfDcCASxzpYzq0yNJjOVDMAAaP4HHl1iiudMuNpiEk4klkMknfNZXovTQhtuuaDdN5tTIkEm4RKk5kTnRal4GnTsUQ52iIa/0QlZiI6N1TVOcTDvUsP0uw/skSw/S7Pcowg0jDcboF8tJIcGEA4TDrxlgQBIHaqWk4dpMGGYRdrbzbwm0SDw5ji76rhDv35bdVSpV+3Wt0OV2E+JPo5UqAJzkJVznuKjh6RJMjAjjCpDZV6nTp1KDwRZdIHnXw0kPvA84GToTG6sh4EMuaxz5yMr5BE0roFqeda0Rf4vPh3X3GwnF5umMxzgXN1Qhc0B1REoC6a9lmlHnGzRxhsbtu/altO3YrTLVNl+5EFZXSOfjKcgcNvVwQeBEsdqe1zXCM27cDS2LdvnXOLnAsfO7qyBzpHdRROs1qcREgmIL5JaXPN1gBDW6xjjN16ExshJ0nucTKc10Qts/9qLhOrZZUxxr+RyQ22z/ANuL2t+KDnrNZbWHMLmx7mxpigua3naxsQ6znudS4Zm7SrZJ+jLFbBFgue6IGC/fD3TAbejFopEdecQ+EK3rohjnzJB6lCAQhCAQhCAQhCAQhQWuOWAEMc+ZkQypAka/l+aCdC8saUfT/wAaOM6N3ZOwqcsN6d9Jvx8XjcBPYKics9vwD0kKKzRS5ocWubPY+V4dYBIB7UR410Tuud/SJoJUKp42ejfw+fn83C1GU7j+Fdvu/MLOqBZQqwtRwuOx2iisqxIEIQqBCEIBCEII4+HD2hMT4+HD2hMVgC5f3n2rqFy4/c+1BnnJbk7YY1i10dzdaTEADowhkAEhpLSaUE9uK63wLGdheRQeMPxx9CEs40HyPfaYQi61kNz3PbCY4El5h1dUeiBUTkcN4WkeBhsrDEB2WiIP0QlIda+jvUsP0uz3JEsP0uz3KuSZCEKAQhCAQhCAQhCAQhCAQhCCpYWxAX6yUrxLKzN0kmppLHDZLEiUraEIBQ2l7gAWNvGeE7tJHaexTKK0BxAuEAzreEwRI04yQV/GI0/9ES/rE9vwVuGTKtDllu3qqxsfa6FiMAcKTAr1pC2PKjoW3YewY4ILqhtL3AC429nWWxQQ2Rpi86GRSdD2kb1PGD5C4Wz23hjwQQGNF6McR7/mW+jhGiynqxPK8N+3hx3Jl2P60PgfmXvV1uFVEic1YRYs/QArjPZ1fPUrSEKqEIQgEIQgEIQgjj4cPaExPj4cPaExWALlx+59q6hcuP3PtQYfovSdpgtieLvc1pbJ5aBMAnY4ibZ7saLWvAt/IP8A7h/+EJYtDtDmtewSLXmZrKVJSkBgto8Cg/8AAf8A+9/+EJSG6pqmZz6O/Sw/S7D+yRLD9Ls9yrCZCgtIMiRMkCgaZTVIR39DH7XjOXrKD1EKhAc5xk5kVlCZucCOqhPyE+PHe0ybDe4SxBAE60qZ5cUFxCo+Mvl/oxJ0+sPepIcVxdIw3AZ3hv2Tww4oLSFUjRnCUmOfTEECuVSpoLiZEgtmDR2IwyQSoQhAIQhAIQhAKC2WcvAAe9kjObDI4ESM6EVU6EHnnRzjOceNUEYgYgidACCJzpLBJ9Gu6eNxb2Vu/M8qL0UIKlksRYZuiRH0H+oRSU6gAAVnXsUtpglwADnN3tx6lMhBUg2NzSCYsRwGwmhoR89XaraEIBCEIBCEIBCEIBCEII4+HD2hMT4+HD2hMVgC5cfufauoXLj9z7UHz4ts8C38g/8AuH/4Qlia2zwLfyD/AO4f/hCR1r6O/QwV7PchNugmuXuRyNtJiNI1TGOEjO866Z7AKdabAjRyQHw2tEzMh05CspCQ3JtpgumNXq5VnfnOeyUu1TQ4IkL12chOWE9stygsptwZKLUt3I1LdyCW4MkXBkotS3cjUt3IJbgyRcGSi1LdyNS3cgluDJFwZKLUt3JsSCJG7dnIynhPZPcgq6y0dBDOP15TypIy479ys2S+Z6xjW1pdN6YljOQ2qtqYsx/oy24zx2dims0EyOsuT2XJ4b5oLdwZIuDJRalu5GpbuQQ2sxQ4auGx7ZVvOumeyVDMKIxLRKkGHP8A9k5Gv2RP4qW0QXf7erl9qe/LsUAgRtuo/V2oPSuDJFwZKhZYUS/EEUQrk/4ZYTeltDwRKe8f92tS3ciRKW4MkXBkotS3cjUt3IqW4MlRiPjguuwobhW7N92eU6Hj15Vs6lu5V7TBfP8Ah6uUh6c8azw7ECxXRr3NhsLZtqXVlS9TacctiY58fEQoRqaF5BlSVbtZmeWxLEgvnzdVKmM57/3VhkESEwJ7ZYT3IK7YsaYnBYKifPwEwDKQqQJnsV64MlFqW7kalu5BLcGSLgyUWpbuRqW7kEtwZJCwZKPUt3JkeDzXXLt6Ru3sJypPdNAkK8Yc4jQ108BsE6DE1kpFDBhEMbfu35C9dwnSclMrAFy/vPtXULl8+s+1B8+LbfAt/IP/ALh/+EJYitt8Cv8AIP8A7h/+EJHSro79EM87s9yEMx7PcjmbaWPdK4+5nzb08OHxURgRZUi1lKdzcKmuYJ7Vc7EdiiZAH5klvJOwo7CilvIvJOxHYgW8i8k7EdhQLeReSdhR2FAt5F5J2I7EC3vmSLyTsR2IFvIvJOwo7CgW8i8k7CjsQLeReSdiOxAt5F5J2I7CgW8i8k7CjsQLeReSdiOxAt5F5J2I7CgW8i8k7CjsQMjGnD2hNTo2HD2hNVgC5fPrPtXULl8+s+1B89rbfAr/ACD/AO4f/wDXCWJTW2+BX+Qf/cP/AMISOlXR36Gel2H9kJYfpdh/ZHNJM5IvHJOQoG3jki8ck5CBt45IvHJOQgbeOSLxyTkIG3jki8ck5CBt45IvHJOQgbeOSLxyTkIG3jki8ck5CBt45IvHJOQgbeOSLxyTkIG3jki8ck5CBt45IvHJOQgbeOSLxyTkIG3jki8ck5CBt45IvHJOQgijGmGXtCanx8OHtCYrAFy+fWfauoVXxdnqt4BJHzfo3SDIbLrr05vNG3vS1Uq6xvqHZljPm6B4MNMvgWNzWQ7wMZ5MhOXMh41CELwfqN6q1Z1Uzzzh68PRFdeUutPKqKKmCZf0/wD6Tncpotf4VRkDWuAN7t4pEL4M/qV/yfQ2tvsb5TxZf6UTDb7PTSu5TRQZat5FagH8uckQp9Sv9yMLb7Fdyli9G89QP7uU407EOwfqH7oQs1fqOI+1UrGFtdi/TkTdxd70fTkTdxd70IWPqGJ85XbWvEfTkTdxd70fTkTdxd70IT6hifOTbWvEfTkTdxd717GiozorL5MjMihOxCF9H9Lxd67e011ZxlLy4uzRRbzpj7rupPrHiUak+seJQhfoXzBqT6x4lGpPrHiUIQGpPrHiUak+seJQhAak+seJRqT6x4lCEBqT6x4lGpPrHiUIQGpPrHiUak+seJQhAak+seJRqT6x4lCEBqT6x4lGpPrHiUIQIYRGLjxKDCPrfmUIQBhH1jxKNSfWPEpUIAQjnPtKdqzuQhAXDuVVsSew7caYUQhUf//Z"
        },
        {
            "department": "Human Resources",
            "chapters": "1",
            "title": "How to add a new employee",
            "duration": "5 Minutes",
            "tags":[""],
            "image":"https://www.e-time.it/wp-content/uploads/2022/03/employees.gif"

        },
    ])
    return (
        <div>
            <div class='flex items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                {currentRoute} Material
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {material.map((item, index) => (
                        console.log(currentRoute, material.department),
                        slugify(item.department) === currentRoute ? (
                            <div class="relative flex flex-col md:flex-row my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                                <div class="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt="thumbnail"
                                        class="h-full w-full rounded-md md:rounded-lg object-contain"
                                    />
                                </div>
                                <div class="p-6">
                                    <div class="flex justify-center items-center space-x-2 mb-4 rounded-full bg-black py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-fit text-center">
                                        <img src={durationIcon} className="h-6" alt="duration" />
                                        <p>{item.duration}</p>
                                    </div>
                                    <h4 class="mb-2 text-slate-800 text-md font-semibold">
                                        {item.title}
                                    </h4>

                                    <div>
                                        <Link to="" class="text-slate-800 font-semibold text-xs hover:underline flex items-center">
                                            Chapter {item.chapter}
                                            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Material;